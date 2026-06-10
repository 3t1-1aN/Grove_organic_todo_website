/**
 * Grove color palettes — calm accent themes for the dark glass UI.
 * Applied via CSS custom properties on document.documentElement.
 */
(function (global) {
    const STORAGE_KEY = "grove-palette-v1";
    const DEFAULT_ID = "forest";

    function hexToRgb(hex) {
        const n = parseInt(String(hex).replace("#", ""), 16);
        return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    }

    function rgba(hex, a) {
        const [r, g, b] = hexToRgb(hex);
        return `rgba(${r}, ${g}, ${b}, ${a})`;
    }

    function accentForeground(hex) {
        const [r, g, b] = hexToRgb(hex);
        const linear = [r, g, b].map((c) => {
            const v = c / 255;
            return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
        });
        const lum = 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
        return lum > 0.62 ? "#18181b" : "#fafafa";
    }

    function alphaTokens(hex) {
        const steps = [0.08, 0.12, 0.14, 0.18, 0.2, 0.22, 0.25, 0.28, 0.3, 0.32, 0.35, 0.55, 0.88, 0.95];
        const out = {};
        steps.forEach((a) => {
            const key = String(Math.round(a * 100)).padStart(2, "0");
            out[`--accent-a${key}`] = rgba(hex, a);
        });
        return out;
    }

    /** @type {Array<{ id: string, name: string, swatch: string[], accent: string, accentLight: string, accentPale: string, backlog: string, backlogMid: string, pageBg: string, pageBgBacklog: string, shellBg: string, shellBgBacklog: string, bgGradient: string, bgGradientBacklog: string, blobs: string[], blobsBacklog: Record<number, string>, textPrimary: string, textBright: string, textBody: string, textDim: string, textMuted: string, navBg: string }>} */
    const PALETTES = [
        {
            id: "forest",
            name: "Forest",
            swatch: ["#4ade80"],
            accent: "#4ade80",
            accentLight: "#86efac",
            accentPale: "#bbf7d0",
            backlog: "#d9f99d",
            backlogMid: "#a3e635",
            pageBg: "#0a1410",
            pageBgBacklog: "#0c1008",
            shellBg: "rgba(5, 12, 8, 0.82)",
            shellBgBacklog: "rgba(12, 14, 6, 0.86)",
            bgGradient: "linear-gradient(165deg, #0a1410 0%, #0e2218 42%, #071209 100%)",
            bgGradientBacklog: "linear-gradient(165deg, #101408 0%, #1a2410 45%, #0a1006 100%)",
            blobs: ["#22c55e", "#4ade80", "#16a34a", "#15803d", "#14532d"],
            blobsBacklog: { 1: "#84cc16", 2: "#ca8a04", 5: "#4d7c0f" },
            textPrimary: "rgba(210, 240, 215, 0.9)",
            textBright: "rgba(220, 250, 230, 0.96)",
            textBody: "rgba(200, 230, 210, 0.82)",
            textDim: "rgba(134, 200, 140, 0.45)",
            textMuted: "rgba(160, 200, 170, 0.55)",
            navBg: "rgba(5, 12, 8, 0.78)",
        },
        {
            id: "sage",
            name: "Sage",
            swatch: ["#5eead4", "#2dd4bf"],
            accent: "#5eead4",
            accentLight: "#99f6e4",
            accentPale: "#ccfbf1",
            backlog: "#a7f3d0",
            backlogMid: "#6ee7b7",
            pageBg: "#0a1214",
            pageBgBacklog: "#0a100e",
            shellBg: "rgba(5, 14, 12, 0.82)",
            shellBgBacklog: "rgba(8, 14, 10, 0.86)",
            bgGradient: "linear-gradient(165deg, #0a1214 0%, #0e1e1c 42%, #071010 100%)",
            bgGradientBacklog: "linear-gradient(165deg, #0a100e 0%, #142018 45%, #080c0a 100%)",
            blobs: ["#14b8a6", "#5eead4", "#0d9488", "#115e59", "#134e4a"],
            blobsBacklog: { 1: "#2dd4bf", 2: "#059669", 5: "#0f766e" },
            textPrimary: "rgba(205, 240, 232, 0.9)",
            textBright: "rgba(215, 250, 242, 0.96)",
            textBody: "rgba(190, 225, 218, 0.82)",
            textDim: "rgba(120, 190, 175, 0.45)",
            textMuted: "rgba(150, 200, 188, 0.55)",
            navBg: "rgba(5, 14, 12, 0.78)",
        },
        {
            id: "moss",
            name: "Moss",
            swatch: ["#a3e635", "#84cc16"],
            accent: "#a3e635",
            accentLight: "#bef264",
            accentPale: "#d9f99d",
            backlog: "#ecfccb",
            backlogMid: "#84cc16",
            pageBg: "#0e120a",
            pageBgBacklog: "#101008",
            shellBg: "rgba(10, 14, 5, 0.82)",
            shellBgBacklog: "rgba(14, 14, 6, 0.86)",
            bgGradient: "linear-gradient(165deg, #0e120a 0%, #1a2210 42%, #0a0c06 100%)",
            bgGradientBacklog: "linear-gradient(165deg, #101008 0%, #1c2410 45%, #0a0a06 100%)",
            blobs: ["#84cc16", "#a3e635", "#65a30d", "#4d7c0f", "#3f6212"],
            blobsBacklog: { 1: "#a3e635", 2: "#ca8a04", 5: "#4d7c0f" },
            textPrimary: "rgba(225, 240, 200, 0.9)",
            textBright: "rgba(235, 248, 210, 0.96)",
            textBody: "rgba(210, 225, 185, 0.82)",
            textDim: "rgba(160, 190, 120, 0.45)",
            textMuted: "rgba(180, 205, 145, 0.55)",
            navBg: "rgba(10, 14, 5, 0.78)",
        },
        {
            id: "dusk",
            name: "Dusk",
            swatch: ["#a5b4fc", "#818cf8"],
            accent: "#a5b4fc",
            accentLight: "#c7d2fe",
            accentPale: "#e0e7ff",
            backlog: "#ddd6fe",
            backlogMid: "#818cf8",
            pageBg: "#0c0a14",
            pageBgBacklog: "#100e12",
            shellBg: "rgba(10, 8, 16, 0.82)",
            shellBgBacklog: "rgba(12, 10, 18, 0.86)",
            bgGradient: "linear-gradient(165deg, #0c0a14 0%, #16122a 42%, #080610 100%)",
            bgGradientBacklog: "linear-gradient(165deg, #100e12 0%, #1a1630 45%, #0a0810 100%)",
            blobs: ["#6366f1", "#a5b4fc", "#4f46e5", "#4338ca", "#312e81"],
            blobsBacklog: { 1: "#818cf8", 2: "#a78bfa", 5: "#4c1d95" },
            textPrimary: "rgba(220, 218, 245, 0.9)",
            textBright: "rgba(232, 230, 252, 0.96)",
            textBody: "rgba(200, 198, 225, 0.82)",
            textDim: "rgba(150, 145, 195, 0.45)",
            textMuted: "rgba(170, 168, 210, 0.55)",
            navBg: "rgba(10, 8, 16, 0.78)",
        },
        {
            id: "ember",
            name: "Ember",
            swatch: ["#fbbf24", "#f59e0b"],
            accent: "#fbbf24",
            accentLight: "#fcd34d",
            accentPale: "#fde68a",
            backlog: "#fef3c7",
            backlogMid: "#f59e0b",
            pageBg: "#121008",
            pageBgBacklog: "#141008",
            shellBg: "rgba(16, 12, 6, 0.82)",
            shellBgBacklog: "rgba(18, 12, 6, 0.86)",
            bgGradient: "linear-gradient(165deg, #121008 0%, #221a0c 42%, #0c0a06 100%)",
            bgGradientBacklog: "linear-gradient(165deg, #141008 0%, #241c0e 45%, #0e0a06 100%)",
            blobs: ["#d97706", "#fbbf24", "#b45309", "#92400e", "#78350f"],
            blobsBacklog: { 1: "#f59e0b", 2: "#ea580c", 5: "#854d0e" },
            textPrimary: "rgba(245, 230, 205, 0.9)",
            textBright: "rgba(252, 240, 220, 0.96)",
            textBody: "rgba(225, 210, 185, 0.82)",
            textDim: "rgba(190, 165, 120, 0.45)",
            textMuted: "rgba(205, 180, 140, 0.55)",
            navBg: "rgba(16, 12, 6, 0.78)",
        },
        {
            id: "mist",
            name: "Mist",
            swatch: ["#7dd3fc", "#93c5fd"],
            accent: "#7dd3fc",
            accentLight: "#bae6fd",
            accentPale: "#e0f2fe",
            backlog: "#bfdbfe",
            backlogMid: "#93c5fd",
            pageBg: "#0a1014",
            pageBgBacklog: "#0a0e12",
            shellBg: "rgba(6, 12, 18, 0.82)",
            shellBgBacklog: "rgba(8, 12, 20, 0.86)",
            bgGradient: "linear-gradient(165deg, #0a1014 0%, #0e1a24 42%, #060a10 100%)",
            bgGradientBacklog: "linear-gradient(165deg, #0a0e12 0%, #101c28 45%, #080a0e 100%)",
            blobs: ["#38bdf8", "#7dd3fc", "#0ea5e9", "#0284c7", "#0369a1"],
            blobsBacklog: { 1: "#93c5fd", 2: "#60a5fa", 5: "#1d4ed8" },
            textPrimary: "rgba(210, 230, 245, 0.9)",
            textBright: "rgba(220, 240, 252, 0.96)",
            textBody: "rgba(190, 215, 235, 0.82)",
            textDim: "rgba(130, 175, 210, 0.45)",
            textMuted: "rgba(150, 190, 220, 0.55)",
            navBg: "rgba(6, 12, 18, 0.78)",
        },
        {
            id: "noir",
            name: "Black",
            swatch: ["#171717", "#525252"],
            accent: "#a3a3a3",
            accentLight: "#d4d4d4",
            accentPale: "#e5e5e5",
            backlog: "#d4d4d4",
            backlogMid: "#737373",
            pageBg: "#0a0a0a",
            pageBgBacklog: "#0c0c0c",
            shellBg: "rgba(12, 12, 12, 0.88)",
            shellBgBacklog: "rgba(16, 16, 16, 0.9)",
            bgGradient: "linear-gradient(165deg, #0a0a0a 0%, #141414 42%, #050505 100%)",
            bgGradientBacklog: "linear-gradient(165deg, #0c0c0c 0%, #1a1a1a 45%, #080808 100%)",
            blobs: ["#262626", "#404040", "#171717", "#525252", "#0a0a0a"],
            blobsBacklog: { 1: "#525252", 2: "#737373", 5: "#262626" },
            textPrimary: "rgba(245, 245, 245, 0.9)",
            textBright: "rgba(250, 250, 250, 0.96)",
            textBody: "rgba(212, 212, 212, 0.82)",
            textDim: "rgba(163, 163, 163, 0.45)",
            textMuted: "rgba(140, 140, 140, 0.55)",
            navBg: "rgba(10, 10, 10, 0.82)",
        },
        {
            id: "chalk",
            name: "White",
            swatch: ["#fafafa", "#e5e5e5"],
            accent: "#f5f5f5",
            accentLight: "#ffffff",
            accentPale: "#ffffff",
            backlog: "#e5e5e5",
            backlogMid: "#d4d4d4",
            pageBg: "#0c0c0e",
            pageBgBacklog: "#101012",
            shellBg: "rgba(18, 18, 20, 0.86)",
            shellBgBacklog: "rgba(22, 22, 24, 0.88)",
            bgGradient: "linear-gradient(165deg, #0c0c0e 0%, #18181b 42%, #09090b 100%)",
            bgGradientBacklog: "linear-gradient(165deg, #101012 0%, #1c1c1f 45%, #0a0a0c 100%)",
            blobs: ["#e5e5e5", "#fafafa", "#a3a3a3", "#d4d4d4", "#525252"],
            blobsBacklog: { 1: "#f5f5f5", 2: "#d4d4d4", 5: "#737373" },
            textPrimary: "rgba(250, 250, 250, 0.92)",
            textBright: "rgba(255, 255, 255, 0.98)",
            textBody: "rgba(228, 228, 231, 0.84)",
            textDim: "rgba(161, 161, 170, 0.48)",
            textMuted: "rgba(180, 180, 188, 0.58)",
            navBg: "rgba(12, 12, 14, 0.84)",
        },
    ];

    const paletteById = Object.fromEntries(PALETTES.map((p) => [p.id, p]));

    function buildTokens(p) {
        const tokens = {
            "--accent": p.accent,
            "--accent-light": p.accentLight,
            "--accent-pale": p.accentPale,
            "--accent-backlog": p.backlog,
            "--accent-backlog-mid": p.backlogMid,
            "--text-primary": p.textPrimary,
            "--text-bright": p.textBright,
            "--text-body": p.textBody,
            "--text-dim": p.textDim,
            "--text-muted": p.textMuted,
            "--priority-low": p.accent,
            "--shell-bg": p.shellBg,
            "--shell-bg-backlog": p.shellBgBacklog,
            "--page-bg": p.pageBg,
            "--page-bg-backlog": p.pageBgBacklog,
            "--accent-tint": rgba(p.accent, 0.14),
            "--accent-tint-strong": rgba(p.accent, 0.18),
            "--accent-border": rgba(p.accentLight, 0.2),
            "--backlog-tint": rgba(p.backlog, 0.12),
            "--backlog-border": rgba(p.backlog, 0.22),
            "--bg-gradient": p.bgGradient,
            "--bg-gradient-backlog": p.bgGradientBacklog,
            "--nav-bg": p.navBg,
            "--nav-text": p.textBody,
            "--nav-text-active": p.accentPale,
            "--focus-running-glow": rgba(p.accent, 0.12),
            "--focus-running-border": rgba(p.accentLight, 0.16),
            "--backlog-shell-glow": rgba(p.backlogMid, 0.08),
            "--backlog-shell-border": rgba(p.backlog, 0.1),
            "--shadow-inset": `inset 3px 3px 8px rgba(0, 0, 0, 0.4), inset -1px -1px 4px ${rgba(p.accent, 0.08)}`,
            "--accent-on": accentForeground(p.accent),
            ...alphaTokens(p.accent),
        };

        p.blobs.forEach((color, i) => {
            tokens[`--blob-${i + 1}`] = color;
        });
        Object.entries(p.blobsBacklog).forEach(([idx, color]) => {
            tokens[`--blob-backlog-${idx}`] = color;
        });

        return tokens;
    }

    function applyPalette(id) {
        const p = paletteById[id] || paletteById[DEFAULT_ID];
        const root = document.documentElement;
        const tokens = buildTokens(p);
        const targets = [root];
        if (document.body) targets.push(document.body);
        targets.forEach((el) => {
            Object.entries(tokens).forEach(([key, val]) => el.style.setProperty(key, val));
        });
        root.dataset.palette = p.id;

        const themeMeta = document.querySelector('meta[name="theme-color"]');
        if (themeMeta) themeMeta.setAttribute("content", p.pageBg);

        if (document.body) {
            syncBodyBackground();
        }

        return p.id;
    }

    function syncBodyBackground() {
        const p = getPalette(loadStoredPaletteId());
        if (!document.body) return;
        document.body.style.backgroundColor = document.body.classList.contains("mode-backlog")
            ? p.pageBgBacklog
            : p.pageBg;
    }

    function loadStoredPaletteId() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw && paletteById[raw]) return raw;
        } catch {
            /* ignore */
        }
        return DEFAULT_ID;
    }

    function savePaletteId(id) {
        if (!paletteById[id]) return;
        try {
            localStorage.setItem(STORAGE_KEY, id);
        } catch {
            /* ignore */
        }
        applyPalette(id);
    }

    function getPalettes() {
        return PALETTES.slice();
    }

    function getPalette(id) {
        return paletteById[id] || paletteById[DEFAULT_ID];
    }

    applyPalette(loadStoredPaletteId());

    global.GrovePalettes = {
        STORAGE_KEY,
        DEFAULT_ID,
        getPalettes,
        getPalette,
        applyPalette,
        loadStoredPaletteId,
        savePaletteId,
        syncBodyBackground,
    };
})(typeof window !== "undefined" ? window : globalThis);
