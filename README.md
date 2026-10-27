# 🔮 LuminaTarot — 琉光塔罗

> *A thread of luminous light, reflecting the self.*

A fully static, build-free tarot reading site: 78 cards, shuffle & draw, AI reading, a study library, and reading history — all in vanilla HTML/CSS/JavaScript.

[Live Demo](https://liya-777.github.io/lumina-tarot/) · [Report an Issue](https://github.com/Liya-777/lumina-tarot/issues)

---

## ✨ Features

### Reading Flow
- **Shuffle** — tap the scattered deck to shuffle; tap again to reshuffle; it automatically fans out into 78 cards
- **Draw** — tap cards by intuition; flip them one by one or use **Flip All**
- **Spreads** — Time Flow (3), Trinity (3), Gain & Loss (3), Emotional Realm (5)
- **Daily Fortune** — instant three-card guidance for today, no shuffling

### Interpretation
- **AI reading** — streams from DeepSeek token by token, weaving in the reader's question and profile
- **Learner mode** — per-card meanings, upright/reversed keywords and positional context
- **User mode** — skips card-by-card detail and shows the direct result

### Study & Collection
- **Study library** — all 78 cards; tap any card for upright/reversed keywords and interpretation
- **Favorites** — tap the ♡ on a card; saved cards can also be opened for study
- **History** — every reading is recorded automatically (latest 10), with revisit, single delete and clear-all
- **Profile** — identity (learner / user) plus multiple seeker profiles, saved locally

### Experience
- 🌗 Day / night themes with pink-gold palette and paper texture
- 🌏 Chinese / English switch
- 🎵 Procedural ambient music (WebAudio synthesis, no audio assets) with volume & mute
- 📱 Fully responsive one-screen layout: vertical scrolling only, no horizontal scrollbars, from 320px up
- 🃏 Fan spread, 3D flip animation, flip sound, share-card export

---

## 🚀 Run Locally

No dependencies, no build step:

```bash
python3 -m http.server 8899
# open http://127.0.0.1:8899/
```

Any static server works (VS Code Live Server, `npx serve`, …).

---

## 🤖 AI Configuration (optional)

Without a key the app falls back to a built-in template reading. To enable DeepSeek streaming:

The repository ships with a working `js/config.js` so that **anyone who opens the deployed site gets an AI reading** without configuring anything.

```js
window.TAROT_CONFIG = {
  deepseekKey: "sk-...",   // DeepSeek API key used by the demo
  deepseekUrl: ""          // optional: your own proxy endpoint
};
```

> ⚠️ This is a static site: the key is visible in the page source and can be used by anyone who finds it. Set a spending limit on the DeepSeek dashboard, and for heavy public traffic switch to a small server-side proxy (`deepseekUrl`) so the key never leaves your server. Templates for both modes live in `js/config.example.js`.

---

## 🗂 Structure

```
.
├── index.html            # single-page views: home / setup / shuffle & pick / reading / study / profile / history
├── css/
│   └── style.css         # themes, one-screen layout, scrollbar, animations
├── js/
│   ├── app.js            # all interaction logic (shuffle, draw, AI reading, study, history, audio)
│   ├── config.example.js # AI config template (copy to config.js)
│   └── data-*.js         # 78 cards (major arcana + four suits, upright & reversed meanings)
└── assets/
    ├── cards/            # 78 card images
    └── sfx/              # flip sound
```

---

## 🛠 Technical Notes

- **Zero dependencies, zero build** — vanilla HTML/CSS/JS (IIFE), runs by opening the folder
- **Streaming AI** — `fetch` + `ReadableStream` over DeepSeek SSE, rendered progressively
- **Procedural audio** — WebAudio drone, minor-chord pads and sparse bells with delay/reverb; sampled flip sound
- **One-screen layout** — fixed viewport views with internal vertical scrolling; a custom scrollbar appears only when content overflows
- **Local persistence** — theme, language, identity, profiles, favorites and history in `localStorage`

See [PROJECT-NOTES.md](PROJECT-NOTES.md) for the design and development write-up.

---

## 🌐 Deployment

GitHub Pages:

1. Repository → Settings → Pages → Source: **Deploy from a branch**
2. Branch `main`, folder `/ (root)` → Save
3. Visit `https://<username>.github.io/lumina-tarot/`

---

## 📄 Notes

- For entertainment and self-reflection only.
- Card artwork and sound assets are used for personal study and portfolio display.
