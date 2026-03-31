import type { DeckType } from './game';
import type { Player, Role, RoomSettings } from './room';
import type { Story } from './game';

// Client → Server
export interface RoomCreatePayload {
  deckType: DeckType;
  settings: RoomSettings;
}

export interface RoomJoinPayload {
  roomId: string;
  displayName: string;
  role: Role;
}

export interface RoomLeavePayload {
  roomId: string;
}

export interface VoteSubmitPayload {
  roomId: string;
  value: string | number;
}

export interface VoteRevealPayload {
  roomId: string;
}

export interface VoteResetPayload {
  roomId: string;
}

export interface StoryAddPayload {
  roomId: string;
  title: string;
  description?: string;
}

export interface StorySelectPayload {
  roomId: string;
  storyId: string;
}

export interface StoryUpdatePayload {
  roomId: string;
  storyId: string;
  estimate: string;
}

export interface StoryDeletePayload {
  roomId: string;
  storyId: string;
}

export interface StoryImportPayload {
  roomId: string;
  stories: { title: string; description?: string }[];
}

export interface TimerStartPayload {
  roomId: string;
  duration: number;
}

export interface TimerStopPayload {
  roomId: string;
}

export interface PlayerRolePayload {
  roomId: string;
  playerId: string;
  role: Role;
}

export interface PlayerKickPayload {
  roomId: string;
  playerId: string;
}

// Server → Client
export interface RoomStatePayload {
  room: import('./room').Room;
  players: Player[];
  stories: Story[];
  currentStory?: Story;
}

export interface RoomJoinedPayload {
  player: Player;
}

export interface RoomLeftPayload {
  playerId: string;
}

export interface VoteSubmittedPayload {
  playerId: string;
}

export interface VoteRevealedPayload {
  votes: { playerId: string; value: string | number }[];
}

export interface StoryAddedPayload {
  story: Story;
}

export interface StorySelectedPayload {
  storyId: string;
}

export interface StoryUpdatedPayload {
  story: Story;
}

export interface StoryDeletedPayload {
  storyId: string;
}

export interface TimerTickPayload {
  remaining: number;
}

export interface PlayerUpdatedPayload {
  player: Player;
}

export interface ErrorPayload {
  message: string;
  code: string;
}
