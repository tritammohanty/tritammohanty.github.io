import assert from "node:assert/strict";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import ts from "typescript";

await mkdir("reports/test-modules", { recursive: true });
const source = await readFile("src/lib/writing.ts", "utf8");
const compiled = ts
  .transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  })
  .outputText.replace('require("@/content/writing.json")', 'require("./writing-data.json")');
await writeFile("reports/test-modules/writing.cjs", compiled);
const actual = JSON.parse(await readFile("src/content/writing.json", "utf8"));
await writeFile("reports/test-modules/writing-data.json", JSON.stringify(actual));
const require = createRequire(import.meta.url);
const data = require("../reports/test-modules/writing-data.json");
const { publishedWriting } = require("../reports/test-modules/writing.cjs");
const now = new Date("2026-10-12T12:00:00Z");
assert(publishedWriting(now).every((entry) => entry.status === "published"));
const existing = {
  kind: "LinkedIn",
  id: "test-post",
  title: "Test post",
  summary: "Fixture post",
  date: "2026-10-08",
  topic: "Project story",
  status: "published",
  url: "https://www.linkedin.com/feed/update/urn:li:activity:123/",
};
const blog = {
  kind: "Blog",
  id: "test-article",
  title: "Test article",
  summary: "Test summary",
  date: "2026-10-09",
  topic: "Tutorial",
  status: "published",
  sections: [{ heading: "Test section", paragraphs: ["Fixture content, never published."] }],
};
data.entries = [
  existing,
  blog,
  { ...blog, id: "private-draft", status: "draft" },
  { ...existing, id: "future-post", date: "2026-10-13" },
];
assert.deepEqual(
  publishedWriting(now).map((entry) => entry.id),
  ["test-article", existing.id],
);
data.entries = [{ ...blog, sections: [] }];
assert.throws(() => publishedWriting(now), /article content/);
data.entries = [existing, { ...existing }];
assert.throws(() => publishedWriting(now), /unique/);
data.entries = [{ ...existing, url: "https://example.com/not-linkedin" }];
assert.throws(() => publishedWriting(now), /LinkedIn/);
data.entries = [{ ...existing, date: "2026-02-30" }];
assert.throws(() => publishedWriting(now));
console.log(
  "Passed: real writing registry, draft/future exclusion, native blog content, date validation, duplicate IDs, and LinkedIn destinations.",
);
