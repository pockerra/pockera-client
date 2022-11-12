import { defineStore } from 'pinia';
import type { Room } from '@/types/room';

export const useStore = defineStore('main', {
  state: () => ({
    user: {
      name: '',
      room: '',
      card: -1,
    },
    room: {
      name: '',
      hidden: true,
    },
  }),
  actions: {
    setUserName(payload: { name: string }) {
      this.user.name = payload.name;
    },
    setUserRoom(payload: { room: string }) {
      this.user.room = payload.room;
    },
    setUserCard(payload: { card: number }) {
      this.user.card = payload.card;
    },
    showCards() {
      this.room.hidden = false;
    },
    hideCards() {
      this.room.hidden = true;
    },
    setRoom(payload: { room: Room }) {
      this.room = payload.room;
    },
  },
});
