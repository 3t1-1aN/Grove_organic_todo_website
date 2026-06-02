# Grove

<p align="center">
  <img src="https://github.com/user-attachments/assets/bf1e5e92-c7e4-4b11-b10c-5f34970b1561" alt="Grove_icon" width="200" />
</p>

<p align="center">
  Tasks, focus & memo — desktop (<a href="https://v2.tauri.app/">Tauri 2</a>) and mobile
  (<strong>PWA</strong>).<br>
  <strong>Live site:</strong> <a href="https://grove-todo.vercel.app/">grove-todo.vercel.app</a>
  · <strong>PWA:</strong> <a href="https://grove-todo.vercel.app/app/">/app/</a><br>
  <strong>Developer:</strong> Ethan Kunder<br>
  <strong>License:</strong> <a href="LICENSE">Apache-2.0</a>
</p>

## Download

Pre-built installers are on [GitHub Releases](https://github.com/3t1-1aN/Grove_organic_todo_website/releases/latest):

| Platform | Files |
| --- | --- |
| Windows | `Grove-x64-setup.exe`, `Grove-x64.msi` |
| macOS (Apple Silicon) | `Grove-aarch64.dmg` |
| Linux | `Grove-amd64.deb`, `Grove-amd64.rpm` |

The macOS build is unsigned — on first launch, right-click the app and choose **Open**.

## Web deploy (Vercel)

**Production:** [https://grove-todo.vercel.app/](https://grove-todo.vercel.app/) · **PWA:** [https://grove-todo.vercel.app/app/](https://grove-todo.vercel.app/app/)

The marketing landing page (`index.html`) and PWA (`app/`) deploy together on Vercel. Each push to `main` runs `npm run build:pwa` (see `vercel.json` and [DEPLOY.md](DEPLOY.md)).

| URL | Content |
| --- | --- |
| https://grove-todo.vercel.app/ | Landing page + download links |
| https://grove-todo.vercel.app/app/ | Installable PWA (tasks, focus, memo) |

No `npm install` is required for the static site build — only Node to run `scripts/build-pwa.mjs`.

## Use on your phone (PWA)

Open **[https://grove-todo.vercel.app/app/](https://grove-todo.vercel.app/app/)** in your mobile browser.

1. Open that URL in Safari (iOS) or Chrome (Android).
2. **iOS:** Share → **Add to Home Screen**.
3. **Android:** Use **Install app** when the browser offers it, or Add to Home Screen from the menu.

Data stays on your device in `localStorage`. On iOS, Safari may clear site data if you do not open the installed app for an extended period.

```bash
npm run build:pwa      # output to app/
npm run pwa:preview    # local http://localhost:4173
```

## Android test app (Capacitor APK)

Sideload a **debug APK** built from the same PWA bundle (full-bleed phone UI, no service worker in the WebView).

**Prerequisites:** [Android Studio](https://developer.android.com/studio) (SDK) and JDK (bundled JBR is fine).

```powershell
# Optional if Gradle cannot find Java:
$env:JAVA_HOME = "C:\Program Files\Android\Android Studio\jbr"
$env:ANDROID_HOME = "$env:LOCALAPPDATA\Android\Sdk"

npm run cap:apk:debug
# APK: android/app/build/outputs/apk/debug/app-debug.apk
```

Copy the APK to your phone and allow **Install unknown apps** when prompted. iOS is deferred (add Capacitor iOS on a Mac later).

When a public beta is published, the APK will appear on [GitHub Releases](https://github.com/3t1-1aN/Grove_organic_todo_website/releases/latest) as `Grove-android-debug.apk` (optional).

Details: [docs/MOBILE-NATIVE.md](docs/MOBILE-NATIVE.md).

## Release builds (CI)

Pushing a version tag builds all three platforms and uploads stable asset names to GitHub Releases:

```bash
git tag v1.0.0
git push origin v1.0.0
```

The workflow lives at `.github/workflows/release.yml`. It runs on `windows-latest`, `macos-latest`, and `ubuntu-22.04`.

## Feedback

Bug reports and feature ideas: [open a feedback issue](https://github.com/3t1-1aN/Grove_organic_todo_website/issues/new/choose) (GitHub account required to submit).

## Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [Rust](https://rustup.rs/)
- [Tauri prerequisites](https://v2.tauri.app/start/prerequisites/) for your OS

If your system drive is low on space, install Rust to another drive:

```powershell
$env:RUSTUP_HOME = "D:\rust\.rustup"
$env:CARGO_HOME = "D:\rust\.cargo"
# Then run rustup-init from https://rustup.rs/
```

## Development

```bash
npm install
npm run dev
```

Dev mode opens DevTools automatically (debug builds only).

## Build

```bash
npm run build
```

Installers are written to `src-tauri/target/release/bundle/` by default. For a custom target dir on Windows (low disk space), set `$env:CARGO_TARGET_DIR = "D:\rust\organic-todo-target"` before building locally.

Platform outputs:

- **Windows:** NSIS setup (`.exe`), MSI (`.msi`)
- **macOS:** `.dmg` (Apple Silicon when built on GitHub Actions)
- **Linux:** `.deb` (Ubuntu/Debian/Mint), `.rpm` (Fedora/RHEL)

## App behavior

- **Close button** hides the window to the system tray (does not quit)
- **Tray menu**: Show / Hide / Quit
- **Tray double-click**: toggle window visibility
- **Single instance**: launching again focuses the existing window
- **Data**: stored in webview `localStorage` (4 keys for tasks, timer, focus, notes)

## Project layout

```
organic-ToDo/
├── index.html          # Marketing landing page (web-only, not bundled in app)
├── vercel.json         # Vercel build + headers (landing + /app/ PWA)
├── capacitor.config.json
├── android/            # Capacitor Android project
├── DEPLOY.md           # Canonical production URLs (grove-todo.vercel.app)
├── Grove_icon.png      # Landing page favicon and hero asset
├── downloads/          # Optional local installer cache (gitignored)
├── app/                # PWA bundle (generated: npm run build:pwa)
├── src/
│   ├── index.html      # Full app UI + logic (vanilla JS)
│   ├── mobile.css      # Phone / PWA layout
│   ├── manifest.webmanifest
│   └── sw.js
├── docs/
│   └── MOBILE-NATIVE.md
├── src-tauri/
│   ├── src/lib.rs      # Tray, single-instance, close-to-hide
│   ├── tauri.conf.json
│   └── icons/
└── assets/             # Tray icon asset
```
