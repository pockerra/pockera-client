import { describe, it, expect, beforeEach, vi } from "vite-plus/test";

const STORAGE_KEY = "pockerra_user";

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

describe("userStore persistence", () => {
  it("persists all fields to localStorage", () => {
    userStore.name = "Alice";
    const stored = JSON.parse(storage.get(STORAGE_KEY)!);
    expect(stored.name).toBe("Alice");
    expect(stored.id).toBe(userStore.id);
    expect(stored.role).toBe("participant");
  });

  it("persists id to localStorage", () => {
    const id = userStore.id;
    userStore.name = "Alice";
    const stored = JSON.parse(storage.get(STORAGE_KEY)!);
    expect(stored.id).toBe(id);
  });

  it("persists role to localStorage", () => {
    userStore.role = "facilitator";
    const stored = JSON.parse(storage.get(STORAGE_KEY)!);
    expect(stored.role).toBe("facilitator");
  });

  it("persists avatar to localStorage", () => {
    userStore.avatar = "avatar.png";
    const stored = JSON.parse(storage.get(STORAGE_KEY)!);
    expect(stored.avatar).toBe("avatar.png");
  });

  it("reads all fields from localStorage on creation", async () => {
    storage.set(STORAGE_KEY, JSON.stringify({
      id: "stored-id",
      name: "Bob",
      role: "facilitator",
      avatar: "bob.png",
    }));
    vi.resetModules();
    const mod = await import("./user.svelte");
    expect(mod.userStore.name).toBe("Bob");
    expect(mod.userStore.id).toBe("stored-id");
    expect(mod.userStore.role).toBe("facilitator");
    expect(mod.userStore.avatar).toBe("bob.png");
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
  it("clears all fields and removes from localStorage", () => {
    userStore.name = "Alice";
    userStore.role = "facilitator";
    userStore.avatar = "alice.png";
    userStore.logout();
    expect(userStore.name).toBe("");
    expect(userStore.role).toBe("participant");
    expect(userStore.avatar).toBeUndefined();
    expect(storage.has(STORAGE_KEY)).toBe(false);
  });
});

describe("userStore setters", () => {
  it("sets id and persists", () => {
    userStore.id = "custom-id";
    expect(userStore.id).toBe("custom-id");
    const stored = JSON.parse(storage.get(STORAGE_KEY)!);
    expect(stored.id).toBe("custom-id");
  });

  it("sets role and persists", () => {
    userStore.role = "facilitator";
    expect(userStore.role).toBe("facilitator");
    const stored = JSON.parse(storage.get(STORAGE_KEY)!);
    expect(stored.role).toBe("facilitator");
  });

  it("sets avatar and persists", () => {
    userStore.avatar = "avatar.png";
    expect(userStore.avatar).toBe("avatar.png");
    const stored = JSON.parse(storage.get(STORAGE_KEY)!);
    expect(stored.avatar).toBe("avatar.png");
  });
});
