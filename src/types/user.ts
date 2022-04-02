import { UserId, RoomName, Card } from '@/types/global';

interface User {
  id: UserId;
  name: string;
  room?: RoomName;
  card?: Card;
}

export { User, UserId, Card };
