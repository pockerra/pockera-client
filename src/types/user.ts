import type { UserId, RoomName, Card } from '@/types/global';

interface User {
  id: UserId;
  name: string;
  room?: RoomName;
  card?: Card;
}

export type { User, UserId, Card };
