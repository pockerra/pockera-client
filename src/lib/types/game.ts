export type GamePhase = "waiting" | "voting" | "revealed";
export type DeckType = "fibonacci" | "tshirt" | "powers2" | "custom";

export interface Vote {
  playerId: string;
  value: string | number;
}

export interface Story {
  id: string;
  title: string;
  description?: string;
  estimate?: string;
}
