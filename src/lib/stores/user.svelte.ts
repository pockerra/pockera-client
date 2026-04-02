import type { Role } from "../types/room";
import { getStorage, setStorage, removeStorage } from "../utils/storage";

const STORAGE_KEY = "pockerra_user";

interface UserData {
  id: string;
  name: string;
  role: Role;
  avatar?: string;
}

function loadUser(): UserData {
  const stored = getStorage<UserData>(STORAGE_KEY);
  return {
    id: stored?.id ?? crypto.randomUUID(),
    name: stored?.name ?? "",
    role: stored?.role ?? "participant",
    avatar: stored?.avatar,
  };
}

function createUserStore() {
  const initial = loadUser();
  let id = $state(initial.id);
  let name = $state(initial.name);
  let role = $state<Role>(initial.role);
  let avatar = $state<string | undefined>(initial.avatar);

  function persist() {
    setStorage(STORAGE_KEY, { id, name, role, avatar });
  }

  // Persist initial state so first-time users get their ID saved
  persist();

  return {
    get id() {
      return id;
    },
    set id(v: string) {
      id = v;
      persist();
    },
    get name() {
      return name;
    },
    set name(v: string) {
      name = v;
      persist();
    },
    get role() {
      return role;
    },
    set role(v: Role) {
      role = v;
      persist();
    },
    get avatar() {
      return avatar;
    },
    set avatar(v: string | undefined) {
      avatar = v;
      persist();
    },
    get isLoggedIn() {
      return name.length > 0;
    },
    logout() {
      name = "";
      role = "participant";
      avatar = undefined;
      id = crypto.randomUUID();
      removeStorage(STORAGE_KEY);
    },
  };
}

export const userStore = createUserStore();
