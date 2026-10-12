import { readFile, access } from "node:fs/promises";
import assert from "node:assert/strict";
import path from "node:path";
const routes = ["index.html", "projects/index.html", "writing/index.html", "projects.html"];
let checks = 0;
for (const route of routes) {
  const html = await readFile(path.join("out", route), "utf8");
  const urls = [...html.matchAll(/(?:href|src)="([^"<>]+)"/g)].map((match) => match[1]);
  for (const value of new Set(urls.filter((url) => url.startsWith("/") || url.startsWith("#")))) {
    const [pathname, hash] = value.split("#");
    const filename = pathname
      ? path.join("out", pathname.split("?")[0], pathname.endsWith("/") ? "index.html" : "")
      : path.join("out", route);
    await access(filename);
    if (hash) {
      const target = await readFile(filename, "utf8");
      assert(target.includes(`id="${hash}"`), `Missing anchor ${value} on ${route}`);
    }
    checks++;
  }
}
console.log(
  `Passed: ${checks} internal routes, anchors, font files, scripts, styles, and images in the static export.`,
);
