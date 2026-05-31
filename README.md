# Grove

Tasks, focus & memo — a lightweight desktop app built with [Tauri 2](https://v2.tauri.app/) (Rust + WebView).

**Developer:** Ethan Kunder  
**License:** [Apache-2.0](LICENSE)

## Download

Pre-built installers are on [GitHub Releases](https://github.com/3t1-1aN/Grove_organic_todo_website/releases/latest):

| Platform | Files |
| --- | --- |
| Windows | `Grove-x64-setup.exe`, `Grove-x64.msi` |
| macOS (Apple Silicon) | `Grove-aarch64.dmg` |
| Linux | `Grove-amd64.deb`, `Grove-amd64.rpm` |

The macOS build is unsigned — on first launch, right-click the app and choose **Open**.

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
├── src/
│   └── index.html      # Full app UI + logic (vanilla JS)
├── src-tauri/
│   ├── src/lib.rs      # Tray, single-instance, close-to-hide
│   ├── tauri.conf.json
│   └── icons/
├── assets/             # Tray icon asset
└── marketing/          # Landing page (web-only, not bundled in app)
```
