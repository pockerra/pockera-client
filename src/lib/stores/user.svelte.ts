import type { Role } from '../types/room';

function createUserStore() {
  let id = $state(crypto.randomUUID());
  let name = $state(localStorage.getItem('pockerra_name') ?? '');
  let role = $state<Role>('participant');
  let avatar = $state<string | undefined>(undefined);

  return {
    get id() {
      return id;
    },
    set id(v: string) {
      id = v;
    },
    get name() {
      return name;
    },
    set name(v: string) {
      name = v;
      localStorage.setItem('pockerra_name', v);
    },
    get role() {
      return role;
    },
    set role(v: Role) {
      role = v;
    },
    get avatar() {
      return avatar;
    },
    set avatar(v: string | undefined) {
      avatar = v;
    },
    get isLoggedIn() {
      return name.length > 0;
    },
    logout() {
      name = '';
      localStorage.removeItem('pockerra_name');
    },
  };
}

export const userStore = createUserStore();
