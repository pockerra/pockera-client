import { createStore } from 'vuex';

export default createStore({
  state: {
    user: {
      name: '',
      room: '',
      card: -1,
    },
  },
  mutations: {
    setUserName(state, payload) {
      state.user.name = payload.name;
    },
    setRoom(state, payload: { room: string }) {
      state.user.room = payload.room;
    },
    setCard(state, payload: { card: number }) {
      state.user.card = payload.card;
    },
  },
  actions: {},
  modules: {},
});
