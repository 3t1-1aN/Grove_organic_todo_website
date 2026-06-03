# Grove mobile: PWA + Android (Capacitor)

## Current surfaces

| Surface | URL / artifact | Notes |
|---------|----------------|-------|
| **PWA** | [grove-todo.vercel.app/app/](https://grove-todo.vercel.app/app/) | Install via browser; `localStorage` |
| **Android APK (debug)** | Build locally (see below) | Capacitor WebView; same bundle as PWA |
| **Desktop** | [GitHub Releases](https://github.com/3t1-1aN/Grove_organic_todo_website/releases/latest) | Tauri 2 — unchanged |
| **iOS** | Deferred | Add `@capacitor/ios` on a Mac later |

Phone layout uses **full-viewport glass** (no green blob wallpaper behind a floating card). See `src/mobile.css` at `max-width: 480px` and `body.is-phone`.

### Mobile tasks UX (≤480px)

| Control | Behavior |
|---------|----------|
| **+ FAB** | Bottom-right floating button opens the **New task** sheet (title, priority, category) |
| **Filters** | Compact button in the task top bar opens a body-level filters sheet (priority, status, categories) |
| **Task tap** | Opens the task actions sheet (move / remove) |

Sheets and the backdrop are **direct children of `<body>`** so they sit above the task panel (avoids WebView stacking bugs with `backdrop-filter` on `.task-shell`). The backdrop ignores taps for ~350ms after open to prevent ghost-dismiss.

Rebuild after UI changes: `npm run build:pwa` then `npm run cap:sync` or `npm run cap:apk:debug`.

## PWA build & preview

```bash
npm run build:pwa    # writes organic-ToDo/app/
npm run pwa:preview  # serve app/ at http://localhost:4173
```

Vercel runs `npm run build:pwa` on deploy (`vercel.json`). The `app/` folder is gitignored; CI/host generates it.

### PWA limitations

| Topic | Limitation |
|-------|------------|
| iOS storage | Safari may evict site data after ~7 days of no use |
| Background timer | Pomodoro pauses when the app is hidden |
| Push / widgets | Not in PWA v1 |
| Haptics | Weak on iOS; native wrapper later |

## Android (Capacitor) — debug APK

**Stack:** `@capacitor/core` + `@capacitor/android`, `webDir: app`, `appId: com.organic.todo`. Config: `capacitor.config.json`.

### Prerequisites (Windows)

1. [Android Studio](https://developer.android.com/studio) (SDK + platform tools)
2. JDK 17+ — use Android Studio’s bundled JBR (`Program Files\Android\Android Studio\jbr`)
3. Optional: physical device with USB debugging, or an emulator

Set for manual Gradle runs (PowerShell):

```powershell
$env:JAVA_HOME = "C:\Program Files\Android\Android Studio\jbr"
$env:ANDROID_HOME = "$env:LOCALAPPDATA\Android\Sdk"
```

### Build commands

```bash
npm run cap:sync          # build:pwa + cap sync android
npm run cap:icons         # copy launcher icons from src-tauri/icons/android (run npm run icons first if missing)
npm run cap:apk:debug     # sync + icons + assembleDebug (needs JAVA_HOME)
```

Or use the helper script (sets `JAVA_HOME` automatically):

```powershell
.\scripts\assemble-debug-apk.ps1
```

**Output:** `android/app/build/outputs/apk/debug/app-debug.apk`

### Install on a device (sideload)

1. Copy `app-debug.apk` to the phone (USB, cloud, etc.).
2. Open the file and allow **Install unknown apps** for your file manager or browser (varies by OEM).
3. Launch **Grove**. Data uses the same `localStorage` keys as the PWA.

### App UI lock (PWA + native — cross-device consistency)

Grove uses the same locked phone UI on mobile browsers, installed PWAs, and Capacitor wrappers:

| Layer | File | What it locks |
|-------|------|----------------|
| Boot | `index.html` `#grove-boot` | Early `grove-app-tier` class + viewport before first paint |
| Design tokens | `src/grove-tokens.css` | Colors, radii, shadows, fonts (`:root`) |
| Phone layout | `src/mobile.css` | Full-bleed glass, sheets, FAB, ≤480px |
| App overrides | `src/app-ui-lock.css` | Text scaling, overscroll, dark scheme, wide-tablet fallback |
| Runtime | `initAppUiLock()` in `index.html` | Classes, viewport lock, StatusBar on native |
| WebView settings | `MainActivity.java` | `textZoom=100`, no pinch zoom, `#0a1410` background |
| System chrome | `styles.xml`, `colors.xml`, StatusBar plugin | Status + nav bar colors, cutout mode |

**Phone tier** applies when: viewport ≤480px, installed PWA (`display-mode: standalone`), or Capacitor native. Wide installed/native viewports use `width=480` so `mobile.css` phone rules always match.

All stylesheets above are copied into the PWA bundle (`npm run build:pwa`). Rebuild the APK after changing them.

### Native WebView behavior (`src/index.html`)

| Concern | Behavior on Capacitor |
|---------|-------------------------|
| PWA install banner | Hidden (`isStandaloneDisplay()` includes native) |
| Service worker | Not registered |
| Status / splash | `#0a1410` via `capacitor.config.json` + Android `styles.xml` |
| Body class | `is-native-app` + `grove-app-tier` + `html.grove-android` |
| Phone layout tier | Always on (`isPhoneViewport()` true when native) |
| Typography / zoom | `MainActivity` + `app-ui-lock.css` |
| Orientation | Portrait locked in `AndroidManifest.xml` |

Open Android Studio project: `npm run cap:open:android`

### Icons

`npm run cap:icons` copies mipmap assets from `src-tauri/icons/android/` (generated by `npm run icons`). Splash uses dark background + launcher icon (`res/drawable/splash.xml`).

### Release APK (optional, not required for beta)

Signed release builds need a keystore (never commit secrets). Use `assembleRelease` in Android Studio or Gradle after configuring signing.

**GitHub Releases:** Upload `Grove-android-debug.apk` (or similar) on a tag when you want a public beta link from the landing page.

## Storage (v1 vs follow-up)

| Milestone | Approach |
|-----------|----------|
| **Debug APK (now)** | `localStorage` — same as PWA |
| **Follow-up** | `@capacitor/preferences` migration + **local notifications** for Pomodoro in background |

## Deferred: iOS

When ready on a Mac:

- `npm install @capacitor/ios` → `npx cap add ios` → Xcode archive
- Reuse the same `app/` bundle and native guards in `src/index.html`
- Apple Developer Program required for TestFlight/App Store

## Desktop vs mobile matrix

| Feature | Desktop (Tauri) | PWA / Android |
|---------|-----------------|---------------|
| System tray | Yes | No |
| Close hides window | Yes | N/A |
| Min window 1100px | Yes | No |
| Full-bleed phone glass | N/A | Yes (≤480px) |
| Pomodoro in background | Yes | Pause (or notifications later) |

## Related files

- [`src/grove-tokens.css`](../src/grove-tokens.css) — design tokens (`:root`)
- [`src/mobile.css`](../src/mobile.css) — phone breakpoints, full-bleed shells
- [`src/app-ui-lock.css`](../src/app-ui-lock.css) — PWA + native UI lock (cross-device)
- [`capacitor.config.json`](../capacitor.config.json)
- [`scripts/build-pwa.mjs`](../scripts/build-pwa.mjs)
- [`scripts/copy-cap-android-icons.mjs`](../scripts/copy-cap-android-icons.mjs)
- [`scripts/assemble-debug-apk.ps1`](../scripts/assemble-debug-apk.ps1)
- [`android/`](../android/) — Capacitor Android project (committed)
