import { describe, it, expect, beforeEach, vi } from "vite-plus/test";

// Mock localStorage before importing the store
const storage = new Map<string, string>();
vi.stubGlobal("localStorage", {
  getItem: (key: string) => storage.get(key) ?? null,
  setItem: (key: string, value: string) => storage.set(key, value),
  removeItem: (key: string) => storage.delete(key),
});

// Must dynamically import after mocking localStorage
let userStore: typeof import("./user.svelte").userStore;

beforeEach(async () => {
  storage.clear();
  // Re-import to get fresh store state
  vi.resetModules();
  const mod = await import("./user.svelte");
  userStore = mod.userStore;
});

describe("userStore initial state", () => {
  it("has a UUID id", () => {
    expect(userStore.id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
  });

  it("starts with empty name when no localStorage", () => {
    expect(userStore.name).toBe("");
  });

  it("defaults to participant role", () => {
    expect(userStore.role).toBe("participant");
  });

  it("starts with undefined avatar", () => {
    expect(userStore.avatar).toBeUndefined();
  });
});

describe("userStore.name", () => {
  it("persists name to localStorage", () => {
    userStore.name = "Alice";
    expect(storage.get("pockerra_name")).toBe("Alice");
  });

  it("reads name from localStorage on creation", async () => {
    storage.set("pockerra_name", "Bob");
    vi.resetModules();
    const mod = await import("./user.svelte");
    expect(mod.userStore.name).toBe("Bob");
  });
});

describe("userStore.isLoggedIn", () => {
  it("returns false when name is empty", () => {
    expect(userStore.isLoggedIn).toBe(false);
  });

  it("returns true when name is set", () => {
    userStore.name = "Alice";
    expect(userStore.isLoggedIn).toBe(true);
  });
});

describe("userStore.logout", () => {
  it("clears name and removes from localStorage", () => {
    userStore.name = "Alice";
    userStore.logout();
    expect(userStore.name).toBe("");
    expect(storage.has("pockerra_name")).toBe(false);
  });
});

describe("userStore setters", () => {
  it("sets id", () => {
    userStore.id = "custom-id";
    expect(userStore.id).toBe("custom-id");
  });

  it("sets role", () => {
    userStore.role = "facilitator";
    expect(userStore.role).toBe("facilitator");
  });

  it("sets avatar", () => {
    userStore.avatar = "avatar.png";
    expect(userStore.avatar).toBe("avatar.png");
  });
});
