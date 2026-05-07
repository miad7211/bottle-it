# Bottle It — Design Principles v1.1

> A 1-page design guide. Every UI decision should be defensible against this doc. If it's not in here, ask before adding.

---

## North Star Aesthetic

**"Soft Pastel Aquarium"** — photographic bottles drifting in a calm jar. A collection that quietly grows with you. Recognizable bottles you'd actually want to own. Gentle motion everywhere, never stiff.

Synthesized from Mia's design research:
- **Bounce / free-flowing motion** (craftwork — `craftwork.design/curated/website/poch`) → bottles drift freely in jar bounds
- **Realistic-cute product photography with progression** (小红书 reference) → bottles look real, more bottle types appear over time
- **Clean white modal with one illustration** (Mailchimp campaign popup) → modals are minimal, hero one bottle photo
- **Soft pastel product photography** (Hartzler dairy + Glossier vibe) → palette is butter, peach, sage, lavender, soft pink, cream

## The Four Locked-In Moves (from Mia's gut calls)

1. **Hidden progression** — no level numbers. New bottles just appear. Never lecture, never gate explicitly.
2. **Free-floating jar** — bottles drift on independent arcs inside jar bounds. Never a grid. Click to pause + open.
3. **Generic photographic bottles** — AI-generated for legal safety. No real brands (no Coca-Cola, no Heineken). Generic "cola can," "amber beer," etc. Soft pastel-block backdrops baked into each PNG.
4. **小红书-shareable** — a screenshot of the jar should be something Mia *wants* to post. This is our true distribution channel.

---

## The 7 Principles

### P1. Reward, never lecture
Tone is celebratory or curious, never parental. Banned words: *blocked, denied, regret, wasted, willpower, discipline, addiction.* Preferred verbs: *bottle, wait, open, earn, collect, decide.*

### P2. Bottles are the hero
The bottle illustration is the most-loved object on every screen. Treat each bottle as a precious item — soft drop shadows, gentle bob, glow when ready. Never use a generic "lock" or "padlock" icon as the primary visual.

### P3. Show growth implicitly, never explicitly
A jar of 50 random bottles ≠ a jar that *got* to 50. Growth is shown by *new bottle types quietly appearing* — never by "Level 3!" badges, never by streak counters, never by "X to next tier" progress bars. The user discovers, not gets told. A new bottle type's first appearance gets a one-time toast: *"a new kind of bottle has appeared in your jar ✨"* — said once, then never again. Loss aversion is acceptable as gentle background tension (shattered bottles), never as a primary message.

### P4. One unified visual language
The toolbar popup, the lock form, the jar, the unlock modal — all four surfaces share the same color palette, type ramp, button shapes, and corner radii. Mia caught this herself: *"the popup style needs to match the website that stores the bottles."* This is non-negotiable.

### P5. Motion is gentle, never flashy
- Bottles bob (1–2px sway, 3s loop)
- Hover lifts (2px translateY, 0.15s)
- State changes fade (200–300ms ease)
- Ready bottles glow (drop-shadow gold, slow pulse)
- **Banned**: bouncy spring physics on UI elements, confetti showers, screen shake, modal slam-ins

### P6. Every screen has one job
The toolbar popup launches things. The lock form captures things. The jar shows things. The unlock modal decides things. If a screen tries to do two jobs, split it.

### P7. Empty states earn the user a smile
Every screen that can be empty (jar, search, history) shows an illustrated empty state with copy that's helpful + a tiny bit of personality. Never just blank.

---

## Color Palette (Soft Pastel Aquarium)

```
Cream Background     #fdf8f1   ← warm off-white, base for all surfaces
Peach Tint           #fde8d7   ← jar gradient stop, accent backgrounds
Butter               #fef3cd   ← optional accent panel
Sage                 #dde9d5   ← optional accent panel
Lavender             #e8e1f0   ← optional accent panel
Soft Pink            #fadcdc   ← optional accent panel
Card White           #ffffff   ← cards / modals on cream
Ink                  #2d2820   ← primary text (warmer than pure black)
Soft Border          #ebe6dc   ← dividers, input borders
Muted Text           #8a8378   ← secondary text, timestamps
Honey Glow           #d4a017   ← ready state, sparingly
Warning Peach        #fff1e0   ← early-unlock warning bg
Danger Mute          #b85850   ← shatter button (muted, not screaming red)
```

The jar background is a **subtle vertical gradient** from `#fdf8f1` (cream) at top to `#fde8d7` (peach) at bottom. Bottles are isolated PNGs with their own pastel color built into the image (a soft pink panel for cola, sage for wine, etc.), so they pop against the cream jar.

**Banned**: bright primary colors, neon, pure black, dark mode (V1).

## Typography

- **Body family**: system stack (`-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`) — fast, native, free
- **Display serif** for jar title + modal headlines only: `'Fraunces', serif` (Google Font, weight 500). Soft, slightly playful, warmer than Playfair.
- **Sizes**: 12 / 13 / 14 / 16 / 20 / 28 / 36 — no in-between values
- **Weights**: 400 (body), 500 (emphasis + display), 600 (CTAs only). No 700+.

## Corner Radii

- Inputs: `6px`
- Buttons: `8px`
- Cards: `10px`
- Big cards / modals: `16px`

## Spacing (8px grid)

Everything is a multiple of 4: `4, 8, 12, 16, 20, 24, 32, 48`. No `15px`. No `27px`.

---

## The Bottle Visual Strategy

### Build phase (during dev): emoji placeholders
Use system emoji (🥤🧃🍺🧋🍷🥂🍾🥃🍶) at large size (72–96px) so we can build the logic without blocking on assets.

### Polish phase (Phase 5 of plan): AI-generated photographic bottles
Replace emoji with **soft-pastel product photography** generated by AI (DALL·E / Midjourney / Bing Image Creator). Each bottle is a generic version of its category — no brand logos, no real product photos.

**Prompt template for consistency:**
> *"a [BOTTLE_DESCRIPTION], isolated centered on soft [PASTEL_COLOR] solid background, soft diffused lighting, gentle drop shadow below, minimalist product photography in the style of Glossier ad campaigns, 35mm film grain, slight warm color cast, no text, no labels, no logos, square format, 1:1"*

**Per-bottle prompts:**
| Bottle | Description | Pastel BG |
|---|---|---|
| cola | curvy glass bottle of dark cola, no label | soft pink |
| soda | clear glass bottle of light fizzy drink with a lemon slice | sage |
| beer | tall amber-glass beer bottle with no label | butter |
| bubble_tea | sealed plastic cup of milk tea with tapioca pearls and pink straw | lavender |
| wine_red | dark green wine bottle with foil top, no label | soft pink |
| wine_white | clear-green wine bottle with foil top, no label | sage |
| champagne | gold-foil champagne bottle, no label | butter |
| sake | small ceramic flask, soft glaze | soft pink |
| whiskey | square decanter of amber whiskey, no label | butter |

Output: nine 512×512 PNG files saved to `extension/assets/bottles/{type}.png`.

### Bottle Progression (V1, hidden)

User's progression count = items with status `opened-bought` or `opened-tossed` (NOT `shattered`, NOT still-locked). The user **never sees this number**. There are no level labels, no titles, no progress bars.

Internal tiers (visible in code only):

| Threshold (successful unlocks) | Bottles in pool |
|---|---|
| 0+ | 🥤 cola, 🧃 soda |
| 2+ | + 🍺 beer, 🧋 bubble_tea |
| 5+ | + 🍷 wine_red, 🥂 wine_white |
| 10+ | + 🍾 champagne, 🍶 sake |
| 20+ | + 🥃 whiskey (rare honey-glow tier) |

Within unlocked pool, bottle is picked **randomly weighted by lock duration** — longer locks bias toward fancier bottles.

The first time a new bottle type appears in a user's jar, a one-time toast appears: *"a new kind of bottle has appeared in your jar ✨"* — never shown again for that type. Discovery, not announcement.

**Locked-tier bottles do NOT appear as silhouettes** — that would imply "you can unlock these" which is gamey. Users have no idea what's coming until it just appears.

---

## The Jar Layout (free-floating, not grid)

Bottles are absolutely-positioned within the jar's bounded area. Each bottle has:
- A **fixed home position** stored on the data model (`position: { x: 0..1, y: 0..1 }` as ratios), generated at lock time and persisted
- Three independent CSS animations: `drift-x` (10-16s), `drift-y` (7-11s), `sway-rotate` (5-9s) — each with random delays so bottles never sync up
- On hover: animations pause, bottle lifts 4px, soft tooltip shows name + countdown
- On click: opens the unlock modal

Random positions are generated to *roughly* avoid clustering but allow gentle overlap (organic, not gridded). When jar overflows, scroll vertically (jar is "deeper than it looks").

## Anti-patterns (banned by team consensus)

- ❌ Visible level numbers / streak counts / "X to unlock" progress
- ❌ Red-and-green "wrong/right" coloring
- ❌ Streaks measured in days (creates breakage anxiety)
- ❌ Push notifications with guilt copy ("you haven't bottled anything in 3 days")
- ❌ Comparisons to other users (no leaderboards in V1)
- ❌ Dark patterns: pre-checked "share to Instagram", "are you sure" walls of friction
- ❌ Gradient buttons (we're not a 2017 SaaS)
- ❌ Real brand product photos (legal risk — only AI-generated generics)
- ❌ Grid layouts in the jar (we are free-floating; this is our identity)
- ❌ Motion on every element (only on the focal element of a screen)

---

## Sign-off

Whenever a UI decision feels iffy, re-read these principles. Most disagreements resolve themselves.

This doc is **alive** — we update it whenever we discover a new rule we want to enforce. New rules go in this doc *before* they go in code.
