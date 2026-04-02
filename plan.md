# Pockera — Planning Poker App (Frontend)

## Context

Build a Planning Poker web app similar to planningpokeronline.com. This repo is **frontend only** (Svelte 5 + Vite + TypeScript). The backend will be a separate project communicating via REST API + WebSocket.
use context7 to get latest docs of vite+ svelte and other documentations

---

## Tech Stack Additions

| Category  | Choice                                         | Why                                            |
| --------- | ---------------------------------------------- | ---------------------------------------------- |
| Routing   | `svelte-spa-router`                            | Lightweight hash-based SPA router              |
| State     | Svelte 5 runes (`$state`, `$derived`) + stores | Built-in, no extra dependency                  |
| CSS       | Plain CSS / CSS Modules                        | No extra dependency, full control              |
| WebSocket | `socket.io-client`                             | Already used in previous Vue version, reliable |
| Icons     | `lucide-svelte`                                | Lightweight, good icon set                     |
| Animation | Svelte transitions + CSS                       | Card flip animations                           |
| Auth      | Guest-only (display name)                      | Simple start, OAuth can be added later         |

---

## Folder Structure

each file has a test file with same name but with .test.ts extension for unit testing with vite+ testing and is same folder as the component or module it tests, for example CardDeck.svelte will have CardDeck.test.ts in the same folder. This way we can easily find and maintain tests alongside the code they cover.

```
src/
├── lib/
│   ├── components/
│   │   ├── ui/              # Reusable UI primitives (Button, Modal, Input, Card, Avatar, Switch, etc.)
│   │   ├── game/            # Game-specific components
│   │   │   ├── CardDeck.svelte        # Voting card row
│   │   │   ├── PokerCard.svelte       # Individual card with flip animation
│   │   │   ├── PlayerList.svelte      # Players + voting status indicators
│   │   │   ├── PlayerCard.svelte      # Individual player display
│   │   │   ├── VoteResults.svelte     # Results chart + stats after reveal
│   │   │   ├── StoryPanel.svelte      # Current story + story queue
│   │   │   ├── StoryItem.svelte       # Single story in list
│   │   │   ├── Timer.svelte           # Countdown timer
│   │   │   └── InviteLink.svelte      # Copy/share room link
│   │   ├── layout/
│   │   │   ├── Header.svelte
│   │   │   ├── Footer.svelte
│   │   │   └── GameLayout.svelte      # Table layout for game room
│   │   └── auth/
│   │       ├── LoginModal.svelte
│   │       └── DisplayNameForm.svelte
│   ├── stores/
│   │   ├── game.svelte.ts       # Game state (votes, current story, deck, phase)
│   │   ├── room.svelte.ts       # Room state (players, settings, room info)
│   │   ├── user.svelte.ts       # Current user (name, role, avatar, auth)
│   │   └── socket.svelte.ts     # WebSocket connection + event handlers
│   ├── services/
│   │   ├── api.ts               # REST API client (create room, auth, etc.)
│   │   └── socket.ts            # Socket.io setup + event types
│   ├── types/
│   │   ├── game.ts              # Game, Vote, Story, Deck types
│   │   ├── room.ts              # Room, Player, RoomSettings types
│   │   ├── user.ts              # User, Role types
│   │   └── events.ts            # WebSocket event payload types
│   └── utils/
│       ├── decks.ts             # Predefined deck definitions
│       └── stats.ts             # Vote statistics calculations
├── routes/
│   ├── Home.svelte              # Landing page + create room
│   ├── Room.svelte              # Main game room page
│   ├── Join.svelte              # Join room (enter name)
│   └── NotFound.svelte
├── App.svelte                   # Router + global layout
├── main.ts
└── app.css
```

---

## WebSocket Events Design

### Client → Server

| Event          | Payload                           | Description               |
| -------------- | --------------------------------- | ------------------------- |
| `room:create`  | `{ deckType, settings }`          | Create new room           |
| `room:join`    | `{ roomId, displayName, role }`   | Join a room               |
| `room:leave`   | `{ roomId }`                      | Leave room                |
| `vote:submit`  | `{ roomId, value }`               | Submit a vote             |
| `vote:reveal`  | `{ roomId }`                      | Facilitator reveals votes |
| `vote:reset`   | `{ roomId }`                      | Start new voting round    |
| `story:add`    | `{ roomId, title, description? }` | Add story to queue        |
| `story:select` | `{ roomId, storyId }`             | Set active story          |
| `story:update` | `{ roomId, storyId, estimate }`   | Save estimate             |
| `story:delete` | `{ roomId, storyId }`             | Remove story              |
| `story:import` | `{ roomId, stories[] }`           | Bulk import stories       |
| `timer:start`  | `{ roomId, duration }`            | Start countdown           |
| `timer:stop`   | `{ roomId }`                      | Stop timer                |
| `player:role`  | `{ roomId, playerId, role }`      | Change player role        |
| `player:kick`  | `{ roomId, playerId }`            | Remove player             |

### Server → Client

| Event            | Payload                                    | Description              |
| ---------------- | ------------------------------------------ | ------------------------ |
| `room:state`     | `{ room, players, stories, currentStory }` | Full room state sync     |
| `room:joined`    | `{ player }`                               | New player joined        |
| `room:left`      | `{ playerId }`                             | Player left              |
| `vote:submitted` | `{ playerId }`                             | Someone voted (no value) |
| `vote:revealed`  | `{ votes: {playerId: value}[] }`           | All votes revealed       |
| `vote:reset`     | `{}`                                       | Votes cleared            |
| `story:added`    | `{ story }`                                | Story added to queue     |
| `story:selected` | `{ storyId }`                              | Active story changed     |
| `story:updated`  | `{ story }`                                | Story updated            |
| `story:deleted`  | `{ storyId }`                              | Story removed            |
| `timer:tick`     | `{ remaining }`                            | Timer update             |
| `timer:expired`  | `{}`                                       | Timer done               |
| `player:updated` | `{ player }`                               | Player role changed      |
| `error`          | `{ message, code }`                        | Error notification       |

---

## Type Definitions

```typescript
type Role = "facilitator" | "participant" | "spectator";
type GamePhase = "waiting" | "voting" | "revealed";
type DeckType = "fibonacci" | "tshirt" | "powers2" | "custom";

interface Player {
  id: string;
  name: string;
  role: Role;
  avatar?: string;
  hasVoted: boolean;
}
interface Vote {
  playerId: string;
  value: string | number;
}
interface Story {
  id: string;
  title: string;
  description?: string;
  estimate?: string;
}
interface Room {
  id: string;
  name?: string;
  deckType: DeckType;
  deck: (string | number)[];
  facilitatorId: string;
  phase: GamePhase;
  settings: RoomSettings;
}
interface RoomSettings {
  timerEnabled: boolean;
  timerDuration: number;
  autoReveal: boolean;
  allowSpectators: boolean;
}
```

---

## Implementation Phases

### Phase 1: Foundation & Project Setup

- Install dependencies (socket.io-client, svelte-spa-router, lucide-svelte) always check for latest versions
- Set up folder structure
- Create type definitions
- Build reusable UI components (Button, Input, Modal, Avatar, Switch)
- Set up routing (Home, Room, Join, NotFound)
- **Testable**: Navigate between pages, see styled UI components

### Phase 2: Room Creation & Joining (with mock data)

- Landing page with "Create Room" flow
- Deck type selector
- Display name entry form
- Room page layout (table/card area + player list + story panel)
- Mock game state (no WebSocket yet)
- **Testable**: Create room → enter name → see game room layout with mock players

### Phase 3: WebSocket Integration & Core Voting

- Socket.io client setup + connection management find a way to mock backend soicket events for testing
- Room state synchronization
- Join/leave room events
- Card deck display with selection
- Vote submission
- Vote reveal with card flip animation
- Vote results (average, distribution)
- New round / re-vote
- Player list with voting status indicators
- **Testable**: Multiple browser tabs can join a room and vote (requires backend running)

### Phase 4: Story Management

- Add/edit/delete stories
- Story queue sidebar
- Current story display
- Navigate between stories
- Save estimates per story
- CSV import/export
- **Testable**: Create stories, estimate them, export results

### Phase 5: Timer & Player Management

- Countdown timer component
- Timer start/stop/auto-reveal on expiry
- Facilitator controls (kick player, change roles)
- Spectator mode toggle
- **Testable**: Timer counts down, facilitator can manage players

### Phase 6: User Experience

- Guest mode (display name only)
- Persistent user preferences (localStorage)
- Dark/light mode toggle
- Responsive mobile layout
- Sound effects (optional toggle)
- Invite link copy/share
- **Testable**: Full user flow from landing → create → play → export

### Phase 7: Polish & Advanced Features

- Card flip animations
- Confetti/celebration on consensus
- Reconnection handling (socket disconnect/reconnect)
- Error handling & edge cases
- Loading states & skeletons
- PWA support (offline indicator, installable)
- Jira integration (import stories) — if backend supports it

---

## Verification / Testing Strategy

1. **Dev server**: `pnpm dev` — verify routing, UI components render
2. **Multi-tab testing**: Open multiple tabs to test real-time sync (needs backend)
3. **Mobile testing**: Browser dev tools responsive mode
4. **Type checking**: `pnpm check` — ensure no TypeScript errors
5. **Manual flow**: Create room → share link → join in another tab → vote → reveal → next story → export
   TypeScript backend code and replace with Rust implementation plan
