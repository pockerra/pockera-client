import type { DeckType } from "../types/game";

export const DECKS: Record<DeckType, { label: string; values: (string | number)[] }> = {
  fibonacci: {
    label: "Fibonacci",
    values: [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, "?", "☕"],
  },
  tshirt: {
    label: "T-Shirt",
    values: ["XS", "S", "M", "L", "XL", "XXL", "?", "☕"],
  },
  powers2: {
    label: "Powers of 2",
    values: [0, 1, 2, 4, 8, 16, 32, 64, "?", "☕"],
  },
  custom: {
    label: "Custom",
    values: [],
  },
};

export function getDeck(type: DeckType): (string | number)[] {
  return DECKS[type].values;
}
