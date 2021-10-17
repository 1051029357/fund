import { createStore } from "vuex";

export default createStore({
  state: {
    theme: "dark",
  },
  mutations: {
    changeTheme(state) {
      state.theme === "dark" ? (state.theme = "light") : (state.theme = "dark");
    },
  },
  getters: {},
  actions: {},
  modules: {},
});
