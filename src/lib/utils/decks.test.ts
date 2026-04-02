import { describe, it, expect } from "vite-plus/test";
import { DECKS, getDeck } from "./decks";

describe("DECKS", () => {
  it("has all four deck types", () => {
    expect(Object.keys(DECKS)).toEqual(["fibonacci", "tshirt", "powers2", "custom"]);
  });

  it("fibonacci deck has correct values", () => {
    expect(DECKS.fibonacci.label).toBe("Fibonacci");
    expect(DECKS.fibonacci.values).toEqual([0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, "?", "☕"]);
  });

  it("tshirt deck has correct values", () => {
    expect(DECKS.tshirt.label).toBe("T-Shirt");
    expect(DECKS.tshirt.values).toEqual(["XS", "S", "M", "L", "XL", "XXL", "?", "☕"]);
  });

  it("powers2 deck has correct values", () => {
    expect(DECKS.powers2.label).toBe("Powers of 2");
    expect(DECKS.powers2.values).toEqual([0, 1, 2, 4, 8, 16, 32, 64, "?", "☕"]);
  });

  it("custom deck is empty", () => {
    expect(DECKS.custom.label).toBe("Custom");
    expect(DECKS.custom.values).toEqual([]);
  });
});

describe("getDeck", () => {
  it("returns fibonacci deck values", () => {
    expect(getDeck("fibonacci")).toEqual(DECKS.fibonacci.values);
  });

  it("returns tshirt deck values", () => {
    expect(getDeck("tshirt")).toEqual(DECKS.tshirt.values);
  });

  it("returns powers2 deck values", () => {
    expect(getDeck("powers2")).toEqual(DECKS.powers2.values);
  });

  it("returns empty array for custom deck", () => {
    expect(getDeck("custom")).toEqual([]);
  });
});
