import type { DeckType, GamePhase } from './game';

export interface RoomSettings {
  timerEnabled: boolean;
  timerDuration: number;
  autoReveal: boolean;
  allowSpectators: boolean;
}

export interface Room {
  id: string;
  name?: string;
  deckType: DeckType;
  deck: (string | number)[];
  facilitatorId: string;
  phase: GamePhase;
  settings: RoomSettings;
}

export type Role = 'facilitator' | 'participant' | 'spectator';

export interface Player {
  id: string;
  name: string;
  role: Role;
  avatar?: string;
  hasVoted: boolean;
}
