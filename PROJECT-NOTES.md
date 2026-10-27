# Project Notes — LuminaTarot

*A design and development write-up of a static tarot reading website.*

---

## 1. Overview

LuminaTarot is a browser-based tarot reading experience. Visitors keep a question in mind, shuffle a 78-card deck, draw cards by intuition, and receive a reading that combines traditional card meanings with an AI-written interpretation. Beyond the reading itself, the site includes a study library, saved favorites and a reading journal.

The project was built as a self-initiated portfolio piece: the goal was to practice end-to-end product design — visual language, interaction design, front-end engineering and API integration — while shipping something genuinely usable rather than a demo screen.

**Constraints chosen deliberately**

| Constraint | Why |
|---|---|
| No framework, no build step | Keeps the project readable as a portfolio artifact; every behaviour is traceable to a file |
| Single-page, view-switching architecture | Mirrors how a kiosk-like ritual should feel: no page reloads, no URL changes |
| One-screen layout | The reading ritual should never be interrupted by scrolling |
| Local-first data | No backend: profiles, favorites and history live in `localStorage` |

---

## 2. Goals & Audience

**Primary audience** — people curious about tarot who want a calm, guided experience rather than a database of definitions.

**Secondary audience** — learners who want to understand *why* a card means what it means.

These two audiences motivated the **dual identity system**:

- **Learner** — sees each drawn card with keywords, upright/reversed meaning and the position's role.
- **User** — sees only the synthesized result, because a casual reader wants an answer, not a lecture.

The same principle shaped the study library: the interpretation layer is separated from the reading layer so it can be browsed independently.

---

## 3. Design Direction

### Visual language
- Soft pink-gold palette on warm paper, fine grain texture, serif display type for card names
- Two themes: a daylight cream theme and a night theme with deep violet-black
- Cards are treated as objects: rounded corners, layered borders, soft shadows, a subtle 3D flip

### Interaction principles
1. **One screen at a time.** Each step (question → shuffle → draw → read) owns the viewport. Long content scrolls *inside* the view, and only when needed.
2. **Tap, don't scroll.** Shuffling, drawing and flipping are all taps; the scrollbar is a fallback, not a mechanism.
3. **The deck is physical.** The shuffled pile is scattered and chaotic; tapping it re-scatters. Drawn cards land in labelled positions before flipping.
4. **Quiet audio.** Ambient music is generated in real time — a low drone, slow minor chords and occasional bell tones — so there is no loop point and no audio download.

---

## 4. User Flow

```
Home
 ├─ Identity / profiles ──────────────┐
 ├─ Daily Fortune ──► Reading          │
 └─ Start Reading                      │
      ├─ Question (optional)            │
      ├─ Choose spread                  │
      ├─ Shuffle  ──► tap pile          │
      ├─ Draw     ──► tap cards         │
      ├─ Flip     ──► one by one / all  │
      └─ Reading  ──► AI stream ────────┘
                        ├─ History (auto-saved)
                        ├─ Favorites (per card)
                        └─ Study (tap any card)
```

A reading is recorded automatically, so the journal is complete without any manual "save" action. Favorites remain intentionally manual: saving a card is a personal act.

---

## 5. Feature Breakdown

| Area | Behaviour |
|---|---|
| Shuffle | Deck is scattered with random transforms; each tap animates a re-scatter; the fan opens automatically after the last pass |
| Draw | Cards are placed into spread slots; slot layout adapts per spread (line, valley, pair, two-row grid) |
| Flip | Cards flip individually with sound; "Flip All" flips the remainder with a staggered delay |
| Reading | AI text streams into the overall block; learner mode additionally renders per-card blocks |
| Daily | Skips shuffle/draw, draws three cards immediately and renders the reading |
| Study | 78-card grid; modal shows keywords, meanings, upright/reversed toggle |
| Favorites | Heart on each drawn card and in the history view; saved cards open the study modal |
| History | Auto-saved entries, expandable detail, revisit, delete one, clear all |
| Profile | Identity switch plus up to N seeker profiles (age, zodiac, gender, relation), auto-saved |
| Settings | Theme, language, volume, mute |

---

## 6. Technical Implementation

### Architecture
`index.html` holds all views as sibling sections. `showView(name)` toggles a single `.active` class and updates `document.documentElement.dataset.view`, from which layout and scrollbar rules derive. `js/app.js` is one IIFE containing state, rendering and event binding; card data lives in five `data-*.js` files.

### One-screen layout
- Views are sized to `calc(100vh - header)` and scroll internally with `overflow-y: auto`
- Pages whose content always fits (home, setup, shuffle) are locked: `overflow: hidden` plus a flex column that pins the primary action to the bottom
- A **custom scrollbar** (`.cs-rail` / `.cs-thumb`) is rendered only when a view's `scrollHeight` exceeds its `clientHeight`, so fixed screens show no chrome at all
- Horizontal overflow is eliminated globally (`overflow-x: hidden`, no horizontal scrollbars anywhere)

### Streaming AI
The client posts to the DeepSeek chat API with `stream: true`, reads the response body with `ReadableStream` + `TextDecoder`, parses `data:` frames, and paints the accumulated text into the DOM (throttled to ~12 fps). An `AbortController` plus a monotonically increasing `readSeq` guard drops late responses after the user leaves the view.

The prompt is assembled from the question, the drawn cards (name, orientation, keywords, meaning, position) and, optionally, the active seeker profile — so the same deck can yield a personal reading.

### Procedural ambient audio
All background music is synthesized at runtime:
- a low drone (two detuned sine oscillators, slowly modulated low-pass)
- a pad progression (Am – G/B – F – E) with long attack/release envelopes
- sparse bell tones from a pentatonic set, with a second partial for shimmer
- a feedback delay for space

No audio file is downloaded, and one gain node ties the whole bed to the volume control.

### Data model
Keys used in `localStorage`: `lumina_theme`, `lumina_lang`, `lumina_identity`, `lumina_profiles`, `lumina_active_profile`, `lumina_history` (max 10 entries, each storing bilingual card data and the overall reading), `lumina_favs`, `lumina_sound_vol`.

### Internationalization
A single `I18N` object holds `zh`/`en` dictionaries; `t(key, vars)` resolves strings, `applyLang()` walks `[data-i18n]` nodes, and card data carries both languages.

---

## 7. Challenges & Solutions

**Every screen must fit one viewport.**
Fixed heights caused double scrollbars and clipped content at small sizes. The fix was a consistent model: views are flex containers of known height; content that must scroll gets the scroll, everything else is `overflow: hidden`; breakpoints at 1100/1024/820/640/480/360 tune paddings, type sizes and preview heights.

**78 cards on one screen.**
A single row of 78 cards can only be spaced by the viewport width. Making the spacing meaningful required a trade-off curve: full-bleed stage, a flat-ish arc (small angle keeps horizontal room), and smaller fan cards — while the fan must still read as a fan and every card must stay visible and tappable.

**Scrollbars on macOS.**
Native overlay scrollbars are invisible until a scroll starts, which made the layout feel broken. A custom rail fixed visibility, then produced the opposite complaint (bars on pages that fit). The final rule: render the rail only when the active view actually overflows.

**Streaming text vs. state changes.**
Leaving the view mid-stream used to write content into a stale DOM. Each render now captures a sequence number; callbacks check it before touching the DOM.

**Key handling.**
The AI key must not live in a public repository. The site reads `js/config.js` (git-ignored, template provided) and degrades gracefully to a template reading when absent.

---

## 8. Testing

The site was verified with headless Chromium driven over the DevTools Protocol: scripted runs that enter each view, perform a full reading, and assert layout invariants.

Checks performed:
- `scrollHeight <= clientHeight` for one-screen views across a breakpoint matrix (1920×1080 → 320×700)
- no document-level horizontal overflow on any view
- custom scrollbar visibility matches overflow state
- draw → flip → reading flow completes and history is written
- language/theme switches re-render without errors

---

## 9. What I Learned

- **Constraint-first design beats pixel iteration.** Establishing "one screen, taps only" early made hundreds of later decisions obvious.
- **State machines need names.** Explicit view/step state removed a class of subtle bugs (double-taps, mid-stream navigation).
- **Diagnose from geometry, not screenshots.** Measuring `scrollHeight`, `clientHeight` and bounding boxes in a headless browser answered questions that screenshots only hinted at.
- **Sensitive data belongs outside the artifact.** Treating the API key as configuration, not code, kept the public repo clean.

---

## 10. Future Work

- A tiny server-side proxy so public builds can use AI without exposing a key
- Optional cloud sync for profiles and history (currently device-local)
- More spreads and a custom-spread builder
- Accessibility pass: full keyboard navigation, focus trapping in modals, reduced-motion mode
- Shareable reading links rendered from history entries

---

*Built with vanilla web technology — no frameworks, no build step, no backend.*
