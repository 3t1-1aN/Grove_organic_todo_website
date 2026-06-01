# DESIGN: Grove

**Status:** Active  
**Author:** Ethan

---

## Product shape

A lightweight desktop task app (Tauri 2) with three tabs:

- **Tasks** — Today (max 5 active) + Backlog, four layouts (List, Kanban, Compact, Matrix)
- **Kanban layout** — workflow board with To Do, In Progress, and Done columns; drag cards between stages (priority stays on the task model but is hidden in this view)
- **Focus** — Daily focus queue + Pomodoro timer
- **Memo** — Quick capture on a glass memo grid (same shell as Tasks and Focus)

Data lives in `localStorage`. UI is a single `src/index.html` file (vanilla JS + CSS).

---

## Visual language

### Atmosphere

Dark forest-green glass over animated gradient blobs. Feels calm and tactile — not flat Material, not skeuomorphic chrome.

### Shell pattern

`.task-shell`, `.focus-shell`, `.notes-shell` share:

- `background: rgba(5, 12, 8, 0.82)` + `backdrop-filter: blur(48px)`
- 24px corner radius, subtle noise overlay (`::before`)
- Dual shadow: deep drop + inset hairline border

**Backlog mode** (`body.mode-backlog`): warmer yellow-green tint on shell, blobs, and active controls.

### Color

| Role | Value |
|------|--------|
| Accent | `#4ade80`, `#86efac`, `#bbf7d0` |
| Backlog accent | `#d9f99d`, `#a3e635` |
| Text primary | `rgba(210, 240, 215, 0.9)` |
| Text dim | `rgba(134, 200, 140, 0.45–0.55)` |
| Priority high | `#ff7070` |
| Priority med | `#ffb060` |
| Priority low | `#4ade80` |

Category colors: `CATEGORY_COLORS` in JS (green, lime, amber, rose, sky, violet, slate).

### Typography

- **UI body:** `Patrick Hand` cursive (default body stack)
- **Display + memo text:** `Caveat` cursive (headings, timer, memo composer and cards)

### Controls

Neumorphic raised/inset pattern:

- **Raised:** outer dual shadow + inset top highlight (`.view-tab`, `.focus-ctrl`, `.filter-btn`)
- **Inset tray:** inner shadows (`.focus-durations`, `.add-area`, `.notes-input`)
- **Active:** inset shadow flip + accent tint

Spring easing for selection/state changes: `cubic-bezier(0.34, 1.4, 0.64, 1)`. Hover uses simple `translateY(-2px)` — no repeat bounce.

### Motion

- Blob drift: slow ambient background
- Task dismiss: slide-out + collapse
- Memo dismiss: sink animation (`memoSink`) — fade, scale down, inset shadow
- Priority bloom: tray scale-in from orb
- Respect `prefers-reduced-motion` on focus indicators and memo cards

---

## Component notes

### Tasks

- **Today cap meter** — dot row showing `N of 5 tasks`; amber state when full
- **Task cards** — priority stripe (`::before`), checkbox, priority orb bloom, expandable subtasks
- **Kanban board** — three workflow columns (To Do / In Progress / Done), drag handle on cards, column drop targets with drag-over glow
- **Backlog cards** — left accent stripe + “Add to today” CTA (disabled when today full)
- **Empty states** — illustrated checklist rows (`.task-empty-art`), context-specific copy

### Memo

Glass memo cards (`.note-card`) on the shared `.notes-shell` — same frosted shell as Tasks and Focus. Responsive grid (`.notes-wall`), green left accent stripe (`::before`), neumorphic inset composer (`.notes-input`), Caveat text, spring hover lift, and `memoEmerge` / `memoSink` enter/exit motion. Click a card to remove; relative timestamps in `.note-meta`.

### Focus

- Mode tabs with sliding indicator (Daily Focus / Pomodoro)
- Daily: two-column queue + session panel
- Pomodoro: large tabular timer, circular hero control

---

## Layout breakpoints

| Breakpoint | Behavior |
|------------|----------|
| `min-width: 900px` | List layout → 2-column card grid |
| `max-width: 820px` | Task shell → single column; sidebar stacks above list |
| `max-width: 760px` | Notes/focus shell padding + note grid tighten |

---

## Naming (user-facing)

| Internal | UI label |
|----------|----------|
| `view: today` | Today |
| `view: backlog` | Backlog |
| `place: today` / `place: backlog` | (same) |
| `taskLayout: eisenhower` | Matrix |

---

## Out of scope (removed)

Pixel garden / plant visualization, growth stages, harvest journal, and related metaphors are **not** part of this product direction.
