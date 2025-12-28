# Game Design Document: The Ministry of Forgotten Characters

> An interactive fiction game where learning Chinese characters IS the gameplay.

---

## High Concept

You are a Spirit Monk initiate in the Celestial Bureaucracy. Your job: process case files containing chaotic spirits (Chinese characters) and bind them to physical forms before they destabilize reality.

Each "case" is a lesson. Each character is a spirit. Learning is binding. The game is the study.

---

## Core Loop

```
1. RECEIVE case file (lesson introduction)
2. ENCOUNTER spirits (characters appear one by one)
3. BIND spirits (speak their name, understand their meaning)
4. RESOLVE case (lesson complete, characters bound)
5. REVIEW bound spirits (spaced repetition)
```

---

## Technical Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Narrative Engine | **Ink** (inkjs) | Branching story, state, dialogue |
| Web Framework | **Next.js 14** | App shell, routing, deployment |
| Styling | **Tailwind CSS** | Dark atmospheric UI |
| Animations | **Framer Motion** | Subtle, immersive transitions |
| Audio | **Howler.js** | Ambient sound, SFX |
| State | **Zustand** | Game state, bound characters |
| Persistence | **localStorage** | Save progress |
| Hosting | **Vercel** | Free, automatic deploys |

---

## Project Structure

```
/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout (dark theme)
│   │   ├── page.tsx            # Title screen
│   │   ├── game/
│   │   │   └── page.tsx        # Main game view
│   │   └── review/
│   │       └── page.tsx        # Spaced repetition review
│   │
│   ├── components/
│   │   ├── Bureau/             # UI frame components
│   │   │   ├── CaseFile.tsx    # Lesson container
│   │   │   ├── Document.tsx    # Text display
│   │   │   └── Stamp.tsx       # Bound/unbound indicator
│   │   │
│   │   ├── Character/          # Character encounter
│   │   │   ├── Spirit.tsx      # Character display (large, animated)
│   │   │   ├── Binding.tsx     # Binding interaction
│   │   │   └── Info.tsx        # Pinyin, meaning, story
│   │   │
│   │   ├── Ink/                # Ink integration
│   │   │   ├── StoryProvider.tsx
│   │   │   ├── Choices.tsx
│   │   │   └── Paragraph.tsx
│   │   │
│   │   └── Audio/
│   │       └── SoundManager.tsx
│   │
│   ├── ink/                    # Ink story files
│   │   ├── main.ink            # Entry point
│   │   ├── lessons/
│   │   │   ├── lesson01.ink    # Genesis: The Mouth That Counted
│   │   │   ├── lesson02.ink    # Genesis: The Ancient Singer
│   │   │   └── ...
│   │   └── includes/
│   │       ├── characters.ink  # Character data as Ink variables
│   │       └── functions.ink   # Reusable Ink functions
│   │
│   ├── stores/
│   │   ├── gameStore.ts        # Zustand store for game state
│   │   └── audioStore.ts       # Audio state
│   │
│   ├── data/
│   │   └── characters.json     # Imported from exports/
│   │
│   └── styles/
│       └── globals.css         # Tailwind + custom styles
│
├── public/
│   └── audio/
│       ├── ambient/            # Background loops
│       └── sfx/                # Sound effects
│
├── ink/                        # Raw .ink source files
│   └── (compiled to JSON at build time)
│
└── scripts/
    └── compile-ink.js          # Ink → JSON compiler
```

---

## UI Design: The Bureau Aesthetic

### Principles
- **Dark, muted palette** — blacks, deep grays, aged paper tones
- **Chinese typographic influence** — vertical text options, seal stamps
- **Bureaucratic mundanity** — forms, files, stamps, worn edges
- **Subtle supernatural** — glows, particles, breathing animations

### Color Palette
```css
--void: #0a0a0b;           /* Background */
--paper: #1a1915;          /* Document background */
--paper-aged: #2a2520;     /* Older documents */
--ink: #e8e4d9;            /* Primary text */
--ink-faded: #8a8578;      /* Secondary text */
--seal-red: #8b2c2c;       /* Stamps, warnings */
--spirit-glow: #c9a227;    /* Unbound characters */
--spirit-bound: #2d5a3d;   /* Bound characters */
```

### Typography
```css
--font-body: 'Crimson Pro', serif;      /* Narrative text */
--font-ui: 'IBM Plex Mono', monospace;  /* Bureau interface */
--font-chinese: 'Noto Serif TC', serif; /* Characters */
```

---

## Ink Story Structure

### Main Flow
```ink
=== start ===
// Title, new game / continue

=== bureau_intro ===
// Player arrives at the Ministry
// Tutorial framing

=== case_select ===
// Choose which case (lesson) to work on
// Shows bound/unbound status

=== lesson_{n} ===
// Individual lesson stories
// Encounters each character
// Binding mechanics

=== review_mode ===
// Spaced repetition for bound characters
```

### Character Encounter Pattern
```ink
=== encounter_{character} ===
// 1. Character appears (large, atmospheric)
// 2. Spirit speaks (meaning revealed through action)
// 3. Pinyin cue embedded in dialogue
// 4. Player chooses to bind
// 5. Success/failure branch
```

---

## Binding Mechanic

When encountering a character:

1. **Spirit manifests** — Character appears large, glowing, animated
2. **Spirit speaks** — Reveals its nature through dialogue (meaning)
3. **Sound cue** — Pinyin pronunciation embedded in the scene
4. **Binding prompt** — Player must acknowledge understanding
5. **Confirmation** — Character transitions from UNBOUND → BOUND

### State Tracking
```typescript
interface BoundCharacter {
  id: number;
  character: string;
  boundAt: Date;
  reviewHistory: ReviewEvent[];
  nextReview: Date;
  strength: number; // 0-100, decays over time
}
```

---

## Audio Design

### Ambient Layers
- **Bureau hum** — Low drone, distant typing, paper shuffling
- **Spirit presence** — Ethereal tones when characters appear
- **Tension** — Subtle rise when approaching unbound spirits

### Sound Effects
- **Page turn** — Advancing text
- **Brush stroke** — Character reveal
- **Seal stamp** — Binding success
- **Spirit whisper** — Pinyin pronunciation

### Sources (Free)
- Freesound.org (CC0/CC-BY)
- BBC Sound Effects Archive
- Self-generated (can create simple tones)

---

## Progression System

### Case Files (Lessons)
- 55 cases in first release (lessons 1-55)
- Organized by Division (Saga):
  - Genesis Division (creation, numbers)
  - Empire Division (hierarchy, government)
  - Elements Division (fire, water, earth)
  - Nature Division (plants, animals)
  - Family Division (kinship, roles)
  - Craft Division (making, tools)
  - Journey Division (travel, time)
  - Spirit Division (sound, reflection)
  - Body Division (physical, action)

### Unlocking
- Start with Case 001 (Lesson 1)
- Complete cases to unlock adjacent ones
- Some cases have prerequisites (callbacks)

### Metrics
- Characters bound: X / 1500
- Cases closed: X / 55
- Current streak: X days
- Spirits needing review: X

---

## MVP Scope (Month 1)

### Must Have
- [ ] Ink + Next.js integration working
- [ ] Bureau UI shell (dark, atmospheric)
- [ ] Lesson 1 fully playable
- [ ] Character encounter component
- [ ] Basic binding mechanic
- [ ] Progress saves to localStorage

### Nice to Have
- [ ] Ambient audio
- [ ] Animated character reveals
- [ ] Lessons 2-5

### Deferred
- Spaced repetition system
- Full 55 lessons
- Audio polish
- Mobile optimization

---

## Content Pipeline

### For Each Lesson:
1. Pull character data from `exports/lessons/lesson-{n}.json`
2. Pull narrative structure from `gemini_architecture_fixed.json`
3. Write Ink script following Ludonarrative principles
4. Apply Bizarreness Pass
5. Integrate pinyin sound cues
6. Add callbacks to other lessons
7. Test flow and pacing

---

## Success Metrics

The game succeeds if:
1. Players **want** to continue to the next case
2. Players **remember** characters after binding them
3. Players **feel** like they're in a strange, beautiful world
4. Players return for review without it feeling like homework

---

## Open Questions

1. **Timed pressure?** — Should binding have time limits? Or pure exploration?
2. **Failure states?** — What happens if you fail to bind? Retry? Consequences?
3. **Voice acting?** — Could we add TTS for pinyin? Or keep it text-only?
4. **Multiplayer?** — Any social features? Leaderboards? Shared progress?

---

## References

- *80 Days* (Inkle) — Ink-based, gorgeous text presentation
- *A Dark Room* — Minimalist, atmosphere through restraint
- *Sorcery!* (Inkle) — Choices that matter, replayability
- *Control* (Remedy) — Bureaucratic supernatural aesthetic
- *Disco Elysium* — Internal voices, literary prose
