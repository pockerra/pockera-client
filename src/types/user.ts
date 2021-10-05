type UserId = string;
type RoomName = string;
type Card = number;

interface User {
  id: UserId;
  name: string;
  room?: RoomName;
  card?: Card;
}

export { User, UserId, RoomName, Card };
