import { describe, it, expect, beforeEach } from "vitest";
import { roomStore } from "./room.svelte";
import type { Player, Room } from "../types/room";

const makePlayer = (id: string, name = `Player ${id}`): Player => ({
  id,
  name,
  role: "participant",
  hasVoted: false,
});

const makeRoom = (overrides?: Partial<Room>): Room => ({
  id: "room1",
  deckType: "fibonacci",
  deck: [1, 2, 3, 5, 8],
  facilitatorId: "p1",
  phase: "waiting",
  settings: {
    timerEnabled: false,
    timerDuration: 60,
    autoReveal: false,
    allowSpectators: true,
  },
  ...overrides,
});

beforeEach(() => {
  roomStore.reset();
});

describe("roomStore initial state", () => {
  it("starts with null room", () => {
    expect(roomStore.room).toBeNull();
  });

  it("starts with empty players", () => {
    expect(roomStore.players).toEqual([]);
  });

  it("starts disconnected", () => {
    expect(roomStore.connected).toBe(false);
  });
});

describe("roomStore.settings", () => {
  it("returns default settings when no room", () => {
    expect(roomStore.settings).toEqual({
      timerEnabled: false,
      timerDuration: 60,
      autoReveal: false,
      allowSpectators: true,
    });
  });

  it("returns room settings when room exists", () => {
    roomStore.room = makeRoom({
      settings: {
        timerEnabled: true,
        timerDuration: 120,
        autoReveal: true,
        allowSpectators: false,
      },
    });
    expect(roomStore.settings.timerEnabled).toBe(true);
    expect(roomStore.settings.timerDuration).toBe(120);
  });
});

describe("roomStore.addPlayer", () => {
  it("adds a new player", () => {
    roomStore.addPlayer(makePlayer("p1"));
    expect(roomStore.players).toHaveLength(1);
    expect(roomStore.players[0].id).toBe("p1");
  });

  it("does not add duplicate player", () => {
    const player = makePlayer("p1");
    roomStore.addPlayer(player);
    roomStore.addPlayer(player);
    expect(roomStore.players).toHaveLength(1);
  });

  it("adds multiple different players", () => {
    roomStore.addPlayer(makePlayer("p1"));
    roomStore.addPlayer(makePlayer("p2"));
    expect(roomStore.players).toHaveLength(2);
  });
});

describe("roomStore.removePlayer", () => {
  it("removes player by id", () => {
    roomStore.addPlayer(makePlayer("p1"));
    roomStore.addPlayer(makePlayer("p2"));
    roomStore.removePlayer("p1");
    expect(roomStore.players).toHaveLength(1);
    expect(roomStore.players[0].id).toBe("p2");
  });

  it("does nothing if player not found", () => {
    roomStore.addPlayer(makePlayer("p1"));
    roomStore.removePlayer("nonexistent");
    expect(roomStore.players).toHaveLength(1);
  });
});

describe("roomStore.updatePlayer", () => {
  it("updates matching player", () => {
    roomStore.addPlayer(makePlayer("p1", "Alice"));
    roomStore.updatePlayer({ ...makePlayer("p1"), name: "Bob", role: "facilitator" });
    expect(roomStore.players[0].name).toBe("Bob");
    expect(roomStore.players[0].role).toBe("facilitator");
  });

  it("does not affect other players", () => {
    roomStore.addPlayer(makePlayer("p1", "Alice"));
    roomStore.addPlayer(makePlayer("p2", "Bob"));
    roomStore.updatePlayer({ ...makePlayer("p1"), name: "Charlie" });
    expect(roomStore.players[1].name).toBe("Bob");
  });
});

describe("roomStore.setPlayerVoted", () => {
  it("marks player as voted", () => {
    roomStore.addPlayer(makePlayer("p1"));
    roomStore.setPlayerVoted("p1");
    expect(roomStore.players[0].hasVoted).toBe(true);
  });

  it("does not affect other players", () => {
    roomStore.addPlayer(makePlayer("p1"));
    roomStore.addPlayer(makePlayer("p2"));
    roomStore.setPlayerVoted("p1");
    expect(roomStore.players[1].hasVoted).toBe(false);
  });
});

describe("roomStore.resetPlayerVotes", () => {
  it("clears hasVoted for all players", () => {
    roomStore.addPlayer(makePlayer("p1"));
    roomStore.addPlayer(makePlayer("p2"));
    roomStore.setPlayerVoted("p1");
    roomStore.setPlayerVoted("p2");

    roomStore.resetPlayerVotes();

    expect(roomStore.players.every((p) => !p.hasVoted)).toBe(true);
  });
});

describe("roomStore.reset", () => {
  it("resets all state", () => {
    roomStore.room = makeRoom();
    roomStore.addPlayer(makePlayer("p1"));
    roomStore.connected = true;

    roomStore.reset();

    expect(roomStore.room).toBeNull();
    expect(roomStore.players).toEqual([]);
    expect(roomStore.connected).toBe(false);
  });
});
