# Grove — production deploy

**Canonical URLs (use these in docs, CTAs, and release notes):**

| Surface | URL |
| --- | --- |
| Landing page | https://grove-todo.vercel.app/ |
| PWA (phone / install) | https://grove-todo.vercel.app/app/ |

## Platform

- **Host:** [Vercel](https://vercel.com/) — project linked to this repo
- **Config:** `vercel.json` (build + headers)
- **Build:** `npm run build:pwa` → writes `app/` from `src/`
- **GitHub Pages:** not used (workflow removed)

Each push to `main` should trigger a Vercel deploy. The landing page is repo-root `index.html`; the app lives at `/app/`.

## Local preview

```bash
npm run build:pwa
npm run pwa:preview   # http://localhost:4173
```

## Android APK (not deployed on Vercel)

The Capacitor Android app is built locally from the same `app/` bundle (`npm run cap:apk:debug`). It is **not** hosted on Vercel. See [docs/MOBILE-NATIVE.md](docs/MOBILE-NATIVE.md) and [README.md](README.md#android-test-app-capacitor-apk).

Optional: attach `Grove-android-debug.apk` to a [GitHub Release](https://github.com/3t1-1aN/Grove_organic_todo_website/releases) for a public beta download link on the landing page.

## When updating docs or marketing copy

Always link the live PWA as **https://grove-todo.vercel.app/app/** and the site root as **https://grove-todo.vercel.app/** unless a custom domain is explicitly added later.
