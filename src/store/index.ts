import { createStore } from 'vuex';
import { Room } from '@/types/room';

export default createStore({
  state: {
    user: {
      name: '',
      room: '',
      card: -1,
    },
    room: {
      name: '',
      hidden: true,
    },
  },
  mutations: {
    setUserName(state, payload) {
      state.user.name = payload.name;
    },
    setUserRoom(state, payload: { room: string }) {
      state.user.room = payload.room;
    },
    setUserCard(state, payload: { card: number }) {
      state.user.card = payload.card;
    },
    showCards(state) {
      state.room.hidden = false;
    },
    hideCards(state) {
      state.room.hidden = true;
    },
    setRoom(state, payload: Room) {
      state.room = payload;
    },
  },
  actions: {},
  modules: {},
});
