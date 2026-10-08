import http from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { gzipSync } from "node:zlib";
const root = path.resolve("out");
const mime = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".json": "application/json",
  ".txt": "text/plain",
  ".xml": "application/xml",
};
http
  .createServer(async (req, res) => {
    try {
      const url = new URL(req.url, "http://localhost");
      const route = decodeURIComponent(url.pathname);
      const filename = path.resolve(root, "." + route + (route.endsWith("/") ? "index.html" : ""));
      if (filename !== root && !filename.startsWith(root + path.sep)) {
        res.writeHead(403).end();
        return;
      }
      const contents = await readFile(filename);
      const contentType = mime[path.extname(filename)] ?? "application/octet-stream";
      const gzip =
        /text|javascript|json|xml|svg/.test(contentType) &&
        req.headers["accept-encoding"]?.includes("gzip");
      res
        .writeHead(200, {
          "Content-Type": contentType,
          "Cache-Control": route.startsWith("/_next/static/")
            ? "public, max-age=31536000, immutable"
            : "no-cache",
          Vary: "Accept-Encoding",
          ...(gzip ? { "Content-Encoding": "gzip" } : {}),
        })
        .end(gzip ? gzipSync(contents) : contents);
    } catch {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end(await readFile(path.join(root, "404.html")));
    }
  })
  .listen(3000, "127.0.0.1", () =>
    process.stdout.write("Portfolio preview: http://127.0.0.1:3000\n"),
  );
