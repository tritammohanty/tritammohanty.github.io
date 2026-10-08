import assert from "node:assert/strict";
import ts from "typescript";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { createRequire } from "node:module";
await mkdir("reports/test-modules", { recursive: true });
for (const name of ["content", "github"]) {
  const source = await readFile(`src/lib/${name}.ts`, "utf8");
  const compiled = ts
    .transpileModule(source, {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    })
    .outputText.replace('require("./content")', 'require("./content.cjs")');
  await writeFile(`reports/test-modules/${name}.cjs`, compiled);
}
const require = createRequire(import.meta.url);
const api = require("../reports/test-modules/github.cjs");
const snapshot = JSON.parse(await readFile("src/lib/repository-snapshot.json", "utf8"));
const originalFetch = globalThis.fetch;
const cache = new Map();
globalThis.localStorage = {
  getItem: (key) => cache.get(key) ?? null,
  setItem: (key, value) => cache.set(key, value),
};
try {
  let calls = 0;
  globalThis.fetch = async (url) => {
    calls++;
    assert.match(url, new RegExp(`page=${calls}$`));
    return new Response(
      JSON.stringify(
        calls === 1
          ? Array.from({ length: 100 }, (_, index) => ({ ...snapshot[0], id: index + 1 }))
          : [snapshot[1]],
      ),
      { status: 200 },
    );
  };
  const repos = await api.fetchRepositories(new AbortController().signal);
  assert.equal(calls, 2, "All repository pages must be requested");
  assert.equal(repos.length, 101);
  assert.equal(api.readCache().repos.length, 101, "The complete response should be cached");
  assert.equal(api.cacheIsFresh(api.readCache().fetchedAt), true);
  assert.equal(api.cacheIsFresh(Date.now() - 16 * 60 * 1000), false);
  globalThis.fetch = async () => new Response("{}", { status: 403 });
  await assert.rejects(api.fetchRepositories(new AbortController().signal), /rate limited/);
  assert.equal(
    api.readCache().repos.length,
    101,
    "A failed refresh must preserve cached repositories",
  );
  globalThis.fetch = async () =>
    new Response(JSON.stringify({ message: "Unexpected data" }), { status: 200 });
  await assert.rejects(api.fetchRepositories(new AbortController().signal), /unexpected response/);
  cache.set("tritam-repositories-v1", "corrupt-json");
  assert.equal(api.readCache(), null, "A corrupt cache must not crash the portfolio");
  const visible = api.visibleRepositories(snapshot);
  assert(visible.some((repo) => repo.name === "CompanionAI"));
  assert(
    visible.every(
      (repo) =>
        !repo.fork &&
        !repo.archived &&
        !repo.name.includes("github.io") &&
        repo.name !== "Tritam1801",
    ),
  );
  console.log(
    "Passed: GitHub pagination, caching, expired cache, rate limits, invalid responses, corrupt cache, and repository filtering.",
  );
} finally {
  globalThis.fetch = originalFetch;
  delete globalThis.localStorage;
}
