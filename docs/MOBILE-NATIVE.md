# Grove mobile: PWA today, native stores later

## Current approach (PWA)

Grove ships as a **Progressive Web App** built from the same UI as desktop (`src/index.html`):

- Hosted at **[https://grove-todo.vercel.app/app/](https://grove-todo.vercel.app/app/)** (landing at [grove-todo.vercel.app](https://grove-todo.vercel.app/); see `vercel.json`, [DEPLOY.md](../DEPLOY.md))
- `manifest.webmanifest` + `sw.js` for installability and shell caching
- `mobile.css` + `initPwaMobile()` for phone layout, sheets, and install hints
- Data remains in **`localStorage`** (same keys as desktop)

### PWA limitations

| Topic | Limitation |
|-------|------------|
| iOS storage | Safari may evict site data after ~7 days of no use |
| Background timer | Pomodoro pauses when the app is hidden (Page Visibility) |
| Push / widgets | Not available in PWA v1 |
| Haptics | Weak or absent on iOS; defer to native wrapper |

## Build & preview

```bash
npm run build:pwa    # writes organic-ToDo/app/
npm run pwa:preview  # serve app/ locally
```

Desktop Tauri builds are unchanged (`npm run build`).

## Native path (App Store / Google Play)

When the PWA UX is proven, wrap the same web bundle:

### Option A — Capacitor (recommended for speed)

- Add `@capacitor/core` + iOS/Android platforms
- Point `webDir` at `app/` (post `build:pwa`) or `src/`
- Plugins: **Preferences** (storage), **Haptics**, **Local Notifications** (timer)
- Pros: fast, large plugin ecosystem
- Cons: second toolchain alongside Tauri

### Option B — Tauri 2 mobile

- Repo already has `#[cfg_attr(mobile, tauri::mobile_entry_point)]` in `src-tauri/src/lib.rs`
- Split desktop-only code (`tray`, `prevent_close`, single-instance) with `#[cfg(desktop)]`
- Pros: one Rust project
- Cons: heavier iOS/Android setup, Xcode/Android Studio required

### Storage migration (before stores)

Move off raw `localStorage` if you need reliable persistence and backup:

| Runtime | Suggested store |
|---------|-----------------|
| Tauri desktop | `tauri-plugin-store` |
| Capacitor | `@capacitor/preferences` |
| PWA | Keep `localStorage` or IndexedDB wrapper with export |

Ship a one-time migration: read existing `organic-todo-v2` keys, write to new store, keep fallback.

### Desktop vs mobile feature matrix

| Feature | Desktop (Tauri) | PWA / native |
|---------|-----------------|--------------|
| System tray | Yes | No |
| Close hides window | Yes | N/A |
| Min window 1100px | Yes | No |
| Install via store | No | Later |
| Pomodoro background | Yes | Pause or native notification |

## Related files

- [`src/mobile.css`](../src/mobile.css) — phone breakpoints
- [`src/manifest.webmanifest`](../src/manifest.webmanifest)
- [`scripts/build-pwa.mjs`](../scripts/build-pwa.mjs)
- [`DESIGN.md`](../DESIGN.md) — layout breakpoints
