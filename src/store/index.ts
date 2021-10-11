import { createStore } from 'vuex';

export default createStore({
  state: {
    user: {
      name: '',
      room: '',
    },
  },
  mutations: {
    setUserName(state, payload) {
      state.user.name = payload.name;
    },
  },
  actions: {},
  modules: {},
});
