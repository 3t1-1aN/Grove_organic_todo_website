# Security Policy

## Supported versions

Security fixes are provided for the latest release only.

| Version | Supported |
| ------- | --------- |
| 1.0.x   | Yes       |
| < 1.0   | No        |

Install the latest build from [GitHub Releases](https://github.com/3t1-1aN/Grove_organic_todo_website/releases/latest).

## Reporting a vulnerability

**Please do not open a public GitHub issue for security vulnerabilities.**

Report security issues privately so they can be fixed before details are disclosed:

1. Open a [private security advisory](https://github.com/3t1-1aN/Grove_organic_todo_website/security/advisories/new) on this repository, **or**
2. Use **Security → Report a vulnerability** in the GitHub repo UI if private reporting is enabled.

If neither option is available, contact the maintainer through GitHub and ask for a private channel before sharing exploit details.

### What to include

- A clear description of the issue and its impact
- Steps to reproduce, or a proof of concept if you have one
- Affected Grove version(s) and platform(s) (Windows, macOS, Linux)
- Any suggested fix, if you have one

## Scope

### In scope

- The Grove desktop application (Tauri/Rust shell + bundled web UI)
- Official release artifacts published under [GitHub Releases](https://github.com/3t1-1aN/Grove_organic_todo_website/releases)
- The static marketing site served from this repo (`index.html` on GitHub Pages / Vercel)
- Local data handling, IPC, tray/single-instance behavior, and Tauri capability/CSP configuration

### Out of scope

- Bugs with no meaningful security impact (use a [regular bug report](https://github.com/3t1-1aN/Grove_organic_todo_website/issues/new?template=bug_report.yml) instead)
- Social engineering or physical access to an unlocked machine
- Issues in third-party dependencies unless they affect Grove in a exploitable way — report upstream when appropriate, and tell us if Grove is impacted
- macOS Gatekeeper warnings for the unsigned build (expected; documented in the README)
- Vulnerabilities in outdated, unsupported Grove versions

## Security model

Grove is a **local-first desktop app**. Task, focus, and memo data are stored in the webview’s `localStorage` on your machine. The app does not sync data to a Grove-operated server or require an account.

Network access from the app UI is limited by Content Security Policy to `'self'` plus Google Fonts. There is no built-in remote API for user data.

## Response expectations

- **Acknowledgment:** within 7 days of a valid private report
- **Status update:** within 30 days when investigation is ongoing
- **Fix or mitigation:** as soon as reasonably possible, depending on severity and complexity

Thank you for helping keep Grove safe for everyone.
