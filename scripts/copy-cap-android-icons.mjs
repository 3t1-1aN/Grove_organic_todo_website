/**
 * Copies launcher mipmaps from src-tauri/icons/android into Capacitor android/res.
 * Run after npm run icons (tauri icon) if icons change.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const fromBase = path.join(root, "src-tauri", "icons", "android");
const toBase = path.join(root, "android", "app", "src", "main", "res");

const DIRS = [
  "mipmap-hdpi",
  "mipmap-mdpi",
  "mipmap-xhdpi",
  "mipmap-xxhdpi",
  "mipmap-xxxhdpi",
  "mipmap-anydpi-v26",
];

function copyDir(name) {
  const from = path.join(fromBase, name);
  const to = path.join(toBase, name);
  if (!fs.existsSync(from)) {
    console.warn(`skip missing ${from}`);
    return;
  }
  fs.mkdirSync(to, { recursive: true });
  for (const file of fs.readdirSync(from)) {
    fs.copyFileSync(path.join(from, file), path.join(to, file));
  }
}

if (!fs.existsSync(fromBase)) {
  console.error("Run npm run icons first to generate src-tauri/icons/android");
  process.exit(1);
}

for (const d of DIRS) copyDir(d);
console.log("Copied Grove Android launcher icons into Capacitor project");
