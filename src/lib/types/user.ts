import type { Role } from "./room";

export interface User {
  id: string;
  name: string;
  role: Role;
  avatar?: string;
}
