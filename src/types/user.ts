type UserId = string;
type Room = string;
type Card = number;

interface User {
  id: UserId;
  name: string;
  room?: Room;
  card?: Card;
}

export { User, UserId, Room, Card };
