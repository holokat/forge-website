# Handoff: Forge Marketing Website

## Overview
Marketing/landing page for **Forge** — an AI-first, local-first Markdown workspace. The page tells the full product arc: capture by voice on mobile → write with built-in AI on desktop → let external agents read/write the vault via MCP → publish notes as a themed website. It is a single-page, scroll-driven site with light/dark themes, scroll-reveal animations, and several self-running product "demo" animations.

## About the Design Files
The files in this bundle are **design references created in HTML** — a working prototype showing the intended look, motion, and behavior. They are **not** production code to ship directly. The task is to **recreate this design in the target codebase's environment** (e.g. Next.js/React, Astro, Vue, plain HTML/CSS) using that project's established patterns, component library, and conventions. If no environment exists yet, pick the most appropriate stack for a static marketing site (Astro or Next.js are good fits) and implement there.

The prototype is authored as a "Design Component" (`.dc.html`) that depends on a local `support.js` runtime. **Do not port `support.js`** — it is a prototyping harness. Re-implement the logic (documented below) natively.

## Fidelity
**High-fidelity (hifi).** Final colors, typography, spacing, radii, shadows, motion timings, and copy are all specified and should be reproduced closely. All measurements below are exact from the prototype.

---

## Global System

### Typography
- **Display / UI / body:** `Hanken Grotesk` (weights 400/500/600/700/800). Google Fonts.
- **Monospace (eyebrow labels, file names, code, chip meta):** `JetBrains Mono` (400/500/600).
- Headings: `font-weight:800`, `letter-spacing:-.03em` (hero `-.035em`), `line-height:1.02–1.05`.
- Body: 18–19px, `line-height:1.6`, color `--t2`.
- Section eyebrows: JetBrains Mono, 12px, weight 600, `letter-spacing:.16em`, uppercase, e.g. `03 · THE DESKTOP EDITOR`.

### Color tokens (CSS custom properties)
Defined on `.fwpage`; dark theme overrides on `.fwpage[data-theme="dark"]`.

| Token | Light | Dark |
|---|---|---|
| `--pg` (page bg) | `#FFFFFF` | `#0E0F13` |
| `--surface` | `#F7F8FA` | `#16171C` |
| `--surface2` | `#ECEEF2` | `#22242B` |
| `--bd` (border) | `#EBEDF1` | `#262830` |
| `--bd2` (border strong) | `#E1E3E8` | `#2C2F38` |
| `--ink` (primary text) | `#191A1E` | `#F3F1EB` |
| `--inkinv` (text on ink) | `#FFFFFF` | `#141519` |
| `--t2` (secondary text) | `#565A63` | `#A7ABB3` |
| `--t3` (tertiary text) | `#878B94` | `#888C95` |
| `--island` (nav glass) | `rgba(255,255,255,.82)` | `rgba(16,17,22,.82)` |
| `--hexbg` (bg hex outline) | `#EEF0F3` | `#202228` |

**Permanently-dark sections** (do not use tokens; hard-coded so they stay dark in both themes) — the Agents section, the AI-in-editor section, and the CTA card:
- Section bg `#141519`; cards `#1E2027`; borders `#2A2D36` and `#2D3039`; deep insets `#0B0C10` / `#0F1014`.
- Text `#F3F1EB`; secondary `#A6AAB3`; muted `#888C95`; strong-muted line `#C4C4CA`.
- Success accent (recording "synced", publish "verified/live"): dot/text `#2E785A`, light check `#5FC98E`.

### Radii & shadows
- Radii: pills `999px`; buttons `12–14px`; cards `16–20px`; window chrome `16px`; phone bezel outer `52px`, inner screen `47px`; nav island `999px` when docked.
- Card shadow (light): `0 30px 70px -34px rgba(20,22,30,.28)`.
- Editor window shadow: `0 50px 100px -42px rgba(20,22,30,.32)`.
- Nav docked shadow: `0 14px 34px -14px rgba(20,22,30,.22)`.

### Layout
- Content max width `1220px`, side padding `32px` (→ `20px` at ≤560px).
- Sections vertical padding `120–130px` (→ `78px` at ≤560px).

---

## Screens / Sections (top to bottom)

### 1. Nav (fixed)
- Fixed top, centered inner bar, max-width `1220px`. Logo (hex mark in a rounded-square) + wordmark "Forge" left; links + GitHub icon + theme toggle + "Get Forge" pill right.
- Links: **Capture, Editor, Agents, Publish** (anchor links to `#capture`, `#editor`, `#agents`, `#publish`).
- **Scroll behavior:** when `scrollY > 34`, the inner bar animates to a floating "island": `max-width:860px`, `background:var(--island)`, `backdrop-filter:blur(16px)`, `border:1px solid var(--bd)`, `border-radius:999px`, shadow as above, padding `8px 8px 8px 20px`. Transition `max-width .45s cubic-bezier(.2,.7,.2,1)`. Below 900px, the text links hide (icon/toggle/CTA remain).

### 2. Hero
- Two-column grid `1fr 1.1fr`, gap `56px`, collapses to one column ≤900px.
- Left: eyebrow pill `LOCAL-FIRST · AI-NATIVE · MARKDOWN`; H1 **"The AI-first workspace for your Markdown."** ("Markdown" has a highlight bar behind it: absolutely-positioned `12px`-tall `--bd` bar, `border-radius:3px`); subcopy (see Copy); two CTAs.
- H1 size `clamp(40px,5vw,64px)`; drops to `34px` at ≤560.
- Primary CTA "Get Forge" (ink button) opens a **hover/click dropdown** with two rows: "Mac client — Desktop app · macOS" and "Mobile companion — Forge Buddy · iOS". Secondary CTA "See it record" (outline) scrolls to `#capture`.
- Right: **animated agent↔vault visual** (see Interactions). Wrapper `[data-herovisual]` is a centering flex container with `overflow:hidden`; inner `[data-herostage]` is a fixed `460×460` stage. On mobile the stage is **scaled down** (not hidden): `scale(0.82)` ≤560, `0.70` ≤430, `0.60` ≤360, each with a matching negative `margin-bottom` to reclaim the freed vertical space.

### 3. Flow strip
- Full-width surface card containing four steps separated by chevrons: **01 Capture on mobile → 02 Write with AI → 03 Agents read & write → 04 Publish**. Each step = 42px rounded-square icon tile (`--pg` bg, `--bd` border) + mono index + bold label.
- ≤900px: stacks vertically, chevrons hidden.

### 4. Capture on mobile — `#capture` (01)
- Two-column: copy left, phone mock right.
- Copy: eyebrow `01 · CAPTURE ON MOBILE`, H2 "A thought, spoken. A note, filed.", subcopy, and a 3-step list ("Tap once and start talking" / "Watch it transcribe live" / "It syncs to your vault") whose active step highlights during the phone animation.
- **Phone mock:** 326px wide, `#0C0D10` bezel (`padding:5px`, radius 52px), white screen (aspect `9/19.4`), notch. Contains: status bar (9:41 + battery), "Forge Buddy" header with a status pill, a folder chip ("Ideas"), a live-transcribing text area, and a bottom record button (80px circle) with a waveform canvas and timer.

### 5. Agents / The memory layer — `#agents` (02) — permanently dark
- Eyebrow `02 · THE MEMORY LAYER`, H2 "Your notes, safely readable by any agent.", subcopy about MCP + local files.
- **Diagram:** three-column grid `1fr auto 1fr`. Left = three agent cards (Claude "reads context", Codex "writes notes", Cursor · Zed "via MCP"). Center = hex vault node (118px rounded-square with hex glyph) with animated dashed connector lines (`svg[data-diagram-lines]`, hidden ≤900). Right = a `~/vault` file-tree card (`ideas/`, `work/`).
- Below: three reassurance cards — "100% local", "Scoped access", "Just Markdown" (icon tiles, hover raises the icon).

### 6. The desktop editor — `#editor` (03)
- Eyebrow `03 · THE DESKTOP EDITOR`, H2 "Not a note dump. A proper editor.", subcopy.
- **Desktop app window mock** (radius 16px, `--pg` bg, big shadow):
  - Title bar (`--surface`): three neutral `--bd2` dots + centered mono `~/vault — Forge`.
  - Body grid `212px 1fr 224px` (collapses to `1fr` ≤900, side panels hidden via `[data-editside]{display:none}`):
    - **Sidebar** (`--surface`): "VAULT" label + `+`, a search field, folder tree `ideas/` (open: `coffee-rituals.md` **active/selected** with `--surface2` bg, `widget-concept.md`) and `work/` (`release-notes.md`, `standup.md`). File names in JetBrains Mono.
    - **Center editor:** tab strip (active `coffee-rituals.md` with a 2px `--ink` underline via inset box-shadow + close ✕; two inactive tabs) + document: breadcrumb, H1 "Coffee Rituals", paragraph with an inline `[[widget-concept]]` wikilink chip (`--surface2` bg), H2 "The morning pour", paragraph, bullet list; last list item ends with a blinking text caret.
    - **Right panel** (`--surface`): **OUTLINE** (heading hierarchy with left-border indents) and **BACKLINKS · 2** (two cards: `widget-concept.md`, `standup.md`, each with a quoted snippet).
- Below window: four pill chips — Backlinks, Outline, Folders, Tabs.

### 7. AI in the editor — `#ai` (04) — permanently dark
- Eyebrow `04 · AI IN THE EDITOR`, H2 "Write with AI, right in the note.", subcopy that **explicitly contrasts with MCP** (external agents via MCP vs. AI writing *with you* in the editor).
- Two cards (`[data-aigrid]`, grid `1fr 1fr` → `1fr` ≤900):
  - **Slash commands:** a doc line, a `/` with blinking caret, and a dropdown menu (`#0F1014` bg) listing `/continue` (highlighted, "Keep writing in your voice"), `/summarize`, `/rewrite`, `/table`, each with an icon tile + description.
  - **The AI island:** a floating toolbar (`#0B0C10`) with buttons **Improve · Shorter · Longer · | · ✦ Ask AI** positioned above a highlighted (selected) sentence, plus an inline "AI · rewrite" suggestion card below.

### 8. Publish your vault — `#publish` (05)
- Eyebrow `05 · PUBLISH YOUR VAULT`, H2 "From private notes to a published site in one click.", subcopy.
- **Row 1** (`[data-pubgrid]`, grid `0.92fr 1.08fr` → `1fr` ≤900):
  - **Publish panel** (modal-style card): header (globe + "Publish note" + ✕); note-name chip; **THEME** select showing "Editorial ▾"; **CUSTOM DOMAIN** field `notes.maya.dev` with green "Verified"; **Visibility** row with an on-state toggle; full-width ink **Publish** button (up-arrow icon); "Live · updated 2s ago" status with pulsing dot.
  - **Before/after** (`[data-baftergrid]`, grid `1fr auto 1fr` → `1fr` ≤900): raw `.md` code card (mono, with colored `#`, `-`, `[[…]]`) → circular arrow → rendered themed page in a mini browser window (Editorial theme, Georgia serif title "Coffee Rituals", byline, body).
- **Row 2** (`[data-themerow]`, three columns → `1fr` ≤900): theme preview windows — **Minimal** (sans, skeleton lines), **Editorial** (serif, *selected*: 1.5px `--ink` border + check badge), **Terminal** (dark `#141519` panel, mono `$ coffee-rituals`, dark skeleton lines).

### 9. What's inside — `#features` (06)
- Eyebrow `06 · WHAT'S INSIDE`, H2 "One vault. Mobile capture, desktop depth, agent-ready."
- Bento grid, 3 columns (→ 1 col ≤900). Cards: "A real Markdown vault" (span 2), "Voice-first capture" (dark `#191A1E` card), "MCP server built in", "Continuous sync" (span 2, with animated sync dots between a phone and a desktop glyph). Cards have a **3D tilt on mousemove** and an icon hover animation.

### 10. CTA — `#start` — permanently dark
- Dark rounded card, centered. Hex mark, H2 "Start your AI-first vault.", subcopy, two buttons: **Download for Mac** (light) and **Get Forge Buddy** (outline). Below: mono note **"macOS today · Windows & Linux coming soon"**. Faint hex outline watermark behind.

### 11. Footer
- Surface island bar: logo + "Forge" + tagline "The AI-first Markdown workspace."; links (Capture/Editor/Agents/Publish) + GitHub + theme toggle.

---

## Interactions & Behavior

- **Theme toggle:** toggles `data-theme="dark"` on `.fwpage`; persists to `localStorage['forge-theme']` (`'light'`/`'dark'`); toggle icon swaps moon/sun. Two toggle buttons (nav + footer) stay in sync. Default `light`.
- **Nav island on scroll:** see Nav. Passive scroll listener; runs once on load.
- **Scroll-reveal:** elements marked `[data-reveal]` start at `opacity:0; translateY(28px)` and animate to visible via IntersectionObserver (`threshold:0.14`, transition `.8s cubic-bezier(.2,.7,.2,1)`). Hero elements `[data-hero]` reveal on load in sequence (~90ms stagger). A ~1.5s fallback timer forces everything visible (important for print/no-IO). **Respect `prefers-reduced-motion`** (prototype cuts animation durations to ~0).
- **Hero "Get Forge" dropdown:** opens on hover; toggles on click. Menu fades/translates in.
- **Hero agent↔vault animation** (`runVisual`, starts when the visual scrolls into view): loops through scripted events where an agent card highlights (border→`--ink`, slides `translateX(6px)`, connector line brightens, activity label cycles idle → "writing…/reading…"), then either inserts a new file card at the top of the vault list (with a pop animation, trimming to 4, incrementing the note count) or flashes the top file. Dashed connector lines animate via `stroke-dashoffset` keyframes.
- **Phone recording demo** (`runRecording`, starts when the phone scrolls into view): loop — idle → tap (button pulses, ring animation, status → "Recording", timer + waveform canvas start) → live word-by-word transcription of a sample note (interim gray text resolves to solid) → stop → "Saved to Ideas · synced" toast → reset. The left step-list highlights the active step (1/2/3). Waveform is drawn on a `<canvas>` via `requestAnimationFrame` (24 bars, sine envelope). Timer counts `0:00`.
- **Feature card 3D tilt:** `[data-tilt]` rotates based on cursor position (`perspective(900px) rotateX/Y`, max ~4–5°) and lifts `translateY(-4px)`; resets on leave.
- **Icon hover:** `[data-iconcard]` scales/rotates its SVG on hover (`scale(1.16) rotate(-8deg)`).
- **Logo hover:** gentle 360° spin of the hex mark.
- **Smooth scroll:** `html{scroll-behavior:smooth}`; sections have `scroll-margin-top:~90px` for the fixed nav.

### Responsive breakpoints
- **≤900px:** hero → 1 col; hero text nav links hidden; agents diagram → 1 col (connector SVG hidden); editor body → 1 col (side panels hidden); AI grid, publish grid, before/after, theme row, feature grid → 1 col; flow strip stacks (chevrons hidden); reduced hero top padding.
- **≤560px:** content padding → 20px; hero H1 → 34px; phone width `min(300px,84vw)`; section padding → 78px; hero stage `scale(0.82)`, `margin-bottom:-83px`.
- **≤430px:** hero stage `scale(0.70)`, `margin-bottom:-138px`.
- **≤360px:** hero stage `scale(0.60)`, `margin-bottom:-184px`.

---

## State Management
Minimal; all local UI state:
- `theme` — `'light' | 'dark'`, persisted in `localStorage['forge-theme']`.
- Animation runners are self-contained loops guarded by "already running" flags and triggered by IntersectionObserver; they hold transient indices/timers only. No data fetching. In a production rebuild these can be plain component effects / CSS animations; none require global state.

## Design Tokens
See the **Color tokens** table and **Radii & shadows** above. Motion: primary easing `cubic-bezier(.2,.7,.2,1)`; reveal `.8s`; nav morph `.45s`; hover transforms `.2–.5s`. Keyframes in the prototype: `fwBlink` (caret), `fwDot` (sync dots), `fwDash` (dashed lines), `fwPulseRing` (record button), `fwPop` (file card in), `fwFloatY`, `fwTravel`.

## Assets
- **Fonts:** Hanken Grotesk + JetBrains Mono (Google Fonts). Use the codebase's font-loading approach.
- **Icons & the Forge hex logo:** all inline SVG (no image files). Reproduce with the project's icon system or copy the inline SVGs from the prototype. No raster images or third-party logos are used; agent names (Claude, Codex, Cursor, Zed) are text with generic inline-SVG marks — swap for real brand marks only if licensed.
- All product "screenshots" (editor window, phone, publish panel, theme previews) are **built from HTML/CSS**, not images — rebuild as markup.

## Files
- `Forge Website.dc.html` — the complete website prototype (template markup + a `<script type="text/x-dc">` logic class). This is the single source of truth for markup, styles, and behavior.
- `support.js` — prototyping runtime only. **Do not port.** Included so the prototype can be opened/run locally for reference (`Forge Website.dc.html` renders directly in a browser).

### How to run the reference locally
Open `Forge Website.dc.html` in a browser (it loads `support.js` from the same folder). All styles are inline; the two Google Font families load from CDN.
