/**
 * Copies Grove web app (src/) into app/ for https://grove-todo.vercel.app/app/
 * Run: npm run build:pwa — see DEPLOY.md
 */
import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const srcDir = path.join(root, "src");
const appDir = path.join(root, "app");

const COPY_NAMES = [
  "index.html",
  "mobile.css",
  "manifest.webmanifest",
  "sw.js",
  "Grove_icon.png",
];

function rmrf(dir) {
  if (!fs.existsSync(dir)) return;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) rmrf(p);
    else fs.unlinkSync(p);
  }
  fs.rmdirSync(dir);
}

function copyFile(src, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

function ensurePaddedIcons() {
  const iconScript = path.join(root, "scripts", "prepare-icon.py");
  if (!fs.existsSync(iconScript)) return;
  try {
    execSync("python scripts/prepare-icon.py", { cwd: root, stdio: "inherit" });
  } catch (err) {
    console.warn("warn: prepare-icon.py failed; using existing icon files", err?.message || err);
  }
}

function ensureIcon(size, dest) {
  const padded = path.join(srcDir, "icons", `icon-${size}.png`);
  if (fs.existsSync(padded)) {
    copyFile(padded, dest);
    return;
  }
  const candidates = [
    path.join(srcDir, "Grove_icon.png"),
    path.join(root, "Grove_icon.png"),
    path.join(root, "public", "Grove_icon.png"),
  ];
  const source = candidates.find((p) => fs.existsSync(p));
  if (!source) {
    console.warn(`warn: no Grove_icon.png found; skip ${dest}`);
    return;
  }
  copyFile(source, dest);
}

function patchManifestForAppPath() {
  const pkg = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
  const version = pkg.version || "1.0.0";
  const manifestPath = path.join(appDir, "manifest.webmanifest");
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  manifest.start_url = "./";
  manifest.scope = "./";
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n");

  const swPath = path.join(appDir, "sw.js");
  let sw = fs.readFileSync(swPath, "utf8");
  sw = sw.replace(/__SW_VERSION__/g, version);
  fs.writeFileSync(swPath, sw);
}

ensurePaddedIcons();

rmrf(appDir);
fs.mkdirSync(appDir, { recursive: true });
fs.mkdirSync(path.join(appDir, "icons"), { recursive: true });

for (const name of COPY_NAMES) {
  const from = path.join(srcDir, name);
  if (!fs.existsSync(from)) {
    console.warn(`warn: missing src/${name}`);
    continue;
  }
  copyFile(from, path.join(appDir, name));
}

ensureIcon(192, path.join(appDir, "icons", "icon-192.png"));
ensureIcon(512, path.join(appDir, "icons", "icon-512.png"));

patchManifestForAppPath();
console.log(`PWA bundle written to ${appDir}`);
