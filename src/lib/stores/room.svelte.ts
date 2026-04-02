import type { Player, Room, RoomSettings } from '../types/room';

const DEFAULT_SETTINGS: RoomSettings = {
  timerEnabled: false,
  timerDuration: 60,
  autoReveal: false,
  allowSpectators: true,
};

function createRoomStore() {
  let room = $state<Room | null>(null);
  let players = $state<Player[]>([]);
  let connected = $state(false);

  return {
    get room() {
      return room;
    },
    set room(v: Room | null) {
      room = v;
    },
    get players() {
      return players;
    },
    set players(v: Player[]) {
      players = v;
    },
    get connected() {
      return connected;
    },
    set connected(v: boolean) {
      connected = v;
    },
    get settings() {
      return room?.settings ?? DEFAULT_SETTINGS;
    },

    addPlayer(player: Player) {
      if (!players.find((p) => p.id === player.id)) {
        players = [...players, player];
      }
    },
    removePlayer(playerId: string) {
      players = players.filter((p) => p.id !== playerId);
    },
    updatePlayer(player: Player) {
      players = players.map((p) => (p.id === player.id ? player : p));
    },
    setPlayerVoted(playerId: string) {
      players = players.map((p) => (p.id === playerId ? { ...p, hasVoted: true } : p));
    },
    resetPlayerVotes() {
      players = players.map((p) => ({ ...p, hasVoted: false }));
    },
    reset() {
      room = null;
      players = [];
      connected = false;
    },
  };
}

export const roomStore = createRoomStore();
