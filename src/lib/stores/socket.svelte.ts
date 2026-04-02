import { io, type Socket } from 'socket.io-client';
import { roomStore } from './room.svelte';
import { gameStore } from './game.svelte';
import { userStore } from './user.svelte';
import type {
  RoomStatePayload,
  RoomJoinedPayload,
  RoomLeftPayload,
  VoteSubmittedPayload,
  VoteRevealedPayload,
  StoryAddedPayload,
  StorySelectedPayload,
  StoryUpdatedPayload,
  StoryDeletedPayload,
  TimerTickPayload,
  PlayerUpdatedPayload,
  ErrorPayload,
} from '../types/events';

const SERVER_URL = import.meta.env.VITE_SERVER_URL ?? 'http://localhost:3000';

function createSocketStore() {
  let socket = $state<Socket | null>(null);
  let connected = $state(false);
  let error = $state<string | null>(null);

  function connect() {
    if (socket?.connected) return;

    const s = io(SERVER_URL, { transports: ['websocket', 'polling'] });

    s.on('connect', () => {
      connected = true;
      roomStore.connected = true;
      error = null;
    });

    s.on('disconnect', () => {
      connected = false;
      roomStore.connected = false;
    });

    s.on('connect_error', (err) => {
      error = err.message;
      connected = false;
    });

    // Room events
    s.on('room:state', (data: RoomStatePayload) => {
      roomStore.room = data.room;
      roomStore.players = data.players;
      gameStore.stories = data.stories;
      if (data.currentStory) gameStore.currentStoryId = data.currentStory.id;
      gameStore.phase = data.room.phase;
      gameStore.deckType = data.room.deckType;

      // Sync local user ID with backend-assigned player ID
      const me = data.players.find((p) => p.name === userStore.name);
      if (me) {
        userStore.id = me.id;
        userStore.role = me.role;
      }
    });

    s.on('room:joined', (data: RoomJoinedPayload) => {
      roomStore.addPlayer(data.player);
    });

    s.on('room:left', (data: RoomLeftPayload) => {
      roomStore.removePlayer(data.playerId);
    });

    // Vote events
    s.on('vote:submitted', (data: VoteSubmittedPayload) => {
      roomStore.setPlayerVoted(data.playerId);
    });

    s.on('vote:revealed', (data: VoteRevealedPayload) => {
      gameStore.votes = data.votes;
      gameStore.phase = 'revealed';
    });

    s.on('vote:reset', () => {
      gameStore.resetVotes();
      roomStore.resetPlayerVotes();
    });

    // Story events
    s.on('story:added', (data: StoryAddedPayload) => {
      gameStore.addStory(data.story);
    });

    s.on('story:selected', (data: StorySelectedPayload) => {
      gameStore.currentStoryId = data.storyId;
    });

    s.on('story:updated', (data: StoryUpdatedPayload) => {
      gameStore.stories = gameStore.stories.map((s) => (s.id === data.story.id ? data.story : s));
    });

    s.on('story:deleted', (data: StoryDeletedPayload) => {
      gameStore.removeStory(data.storyId);
    });

    // Timer events
    s.on('timer:tick', (_data: TimerTickPayload) => {
      // Timer component handles this via its own state
    });

    s.on('timer:expired', () => {
      // Could auto-reveal based on settings
    });

    // Player events
    s.on('player:updated', (data: PlayerUpdatedPayload) => {
      roomStore.updatePlayer(data.player);
    });

    s.on('error', (data: ErrorPayload) => {
      error = data.message;
    });

    socket = s;
  }

  function disconnect() {
    socket?.disconnect();
    socket = null;
    connected = false;
    roomStore.reset();
  }

  function emit(event: string, data?: unknown) {
    socket?.emit(event, data);
  }

  return {
    get connected() {
      return connected;
    },
    get error() {
      return error;
    },
    connect,
    disconnect,
    emit,
  };
}

export const socketStore = createSocketStore();
