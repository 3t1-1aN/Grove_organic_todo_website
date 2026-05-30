# Grove

Tasks, focus & memo — a lightweight desktop app built with [Tauri 2](https://v2.tauri.app/) (Rust + WebView).

**License:** [Apache-2.0](LICENSE)

## Download

Pre-built Windows installers are on [GitHub Releases](https://github.com/3t1-1aN/grove/releases/latest):

- NSIS setup (`.exe`)
- MSI (`.msi`)

After `npm run build`, upload the files from `D:\rust\organic-todo-target\release\bundle\` to a new release tag (e.g. `v1.0.0`).

## Feedback

Bug reports and feature ideas: [GitHub Issues](https://github.com/3t1-1aN/grove/issues).

## Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [Rust](https://rustup.rs/)
- [Tauri prerequisites for Windows](https://v2.tauri.app/start/prerequisites/) (WebView2, MSVC build tools)

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

Installers are written to `D:\rust\organic-todo-target\release\bundle\` (custom `target-dir` in `src-tauri/.cargo/config.toml`).

Windows outputs:

- NSIS setup (`.exe`)
- MSI (`.msi`)

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

## Future platforms

- **macOS**: same codebase — run `npm run build` on a Mac or macOS CI runner
- **Android / iOS**: requires Tauri mobile init (`tauri android init` / `tauri ios init`) and responsive UI work — see migration plan
