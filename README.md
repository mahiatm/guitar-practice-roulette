# 🎸 Guitar Practice Roulette

A jazz-noir styled mobile app for beginner guitarists. Press a button, get a random practice challenge, and start playing.

## Features

- **Random Challenge Generator** — 20 challenges across 5 categories: Technique, Rhythm & Timing, Chords & Harmony, Ear Training, and Creativity
- **Built-in Metronome** — Visual pulsing metronome auto-starts when a BPM challenge is selected
- **Practice Timer** — Countdown or count-up timer with a warning state at the last 10 seconds
- **Self-Assessment Feedback** — "Nailed It!", "Struggled", or "Abort" after each session
- **Session History** — Local log of all completed challenges with stats
- **User Profile** — Skill level (Beginner / Intermediate / Advanced) and guitar type (Acoustic / Electric) persisted between sessions
- **Jazz Noir aesthetic** — Deep blue backgrounds, brass gold accents, clean typography

## Screens

| Screen | Description |
|--------|-------------|
| **Onboarding** | First-launch setup: skill level, guitar type, tracking preference |
| **Home** | The main "Roll the Dice" screen |
| **Challenge Reveal** | Shows the drawn challenge with Reroll / Start options |
| **Challenge Execution** | Full-screen timer + metronome in focus mode |
| **Completion** | Feedback prompt (Nailed It / Struggled / Abort) |
| **History** | Log of past challenges with success/struggled stats |
| **Settings** | Update profile and clear data |

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React Native with Expo (Managed Workflow) |
| Language | TypeScript |
| Navigation | React Navigation (Native Stack) |
| Persistence | AsyncStorage |
| Styling | StyleSheet API + custom theme |

## Project Structure

```
src/
├── assets/data/        challenges.json (20 challenges)
├── components/
│   ├── common/         Button, CategoryBadge
│   └── challenge/      ChallengeCard, MetronomeDisplay, TimerDisplay
├── config/             theme.ts, constants.ts
├── hooks/              useMetronome.ts, useTimer.ts
├── logic/              challengeGenerator.ts
├── models/             Challenge.ts, UserProfile.ts
├── navigation/         AppNavigator.tsx
├── screens/            Home, Onboarding, ChallengeReveal,
│                       ChallengeExecution, Completion,
│                       History, Settings
└── services/           persistenceService.ts
```

## Getting Started

### Prerequisites

- Node.js 18+
- Expo CLI: `npm install -g expo-cli`
- iOS Simulator / Android Emulator or the [Expo Go](https://expo.dev/client) app

### Install & Run

```bash
git clone https://github.com/YOUR_USERNAME/guitar-practice-roulette.git
cd guitar-practice-roulette
npm install
npm start
```

Then scan the QR code with Expo Go, or press `i` for iOS / `a` for Android.

## Color Palette

| Name | Hex | Usage |
|------|-----|-------|
| Stage Dark | `#1A1A2E` | Primary background |
| Brass Gold | `#FFC72C` | Primary accent, CTAs |
| Deep Burgundy | `#880D3A` | Secondary buttons |
| Ivory White | `#F0F0F0` | Body text |
| Clean Green | `#4CAF50` | Success feedback |
| Muted Red | `#D32F2F` | Failure / warning |

## Roadmap (Post V1.0)

- [ ] Adaptive challenge generation based on struggle history
- [ ] Weekly progress stats & streaks
- [ ] Audio metronome click (low-latency native module)
- [ ] Firebase sync for multi-device progress
- [ ] Shareable challenge cards

## License

MIT
