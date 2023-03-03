import axios from "axios";
import router from '../router';

export default {
  namespaced: true,

  state: {
    userData: null
  },

  getters: {
    user: state => state.userData
  },

  mutations: {
    setUserData(state, user) {
      state.userData = user;
    }
  },

  actions: {
    getUserData({ commit }) {
      axios
        .get(process.env.VUE_APP_ROOT_API + "user")
        .then(response => {
          commit("setUserData", response.data.user);
        })
        .catch(() => {
          localStorage.removeItem("token");
          window.location.reload();
        });
    },
    sendLoginRequest({ commit }, data) {
      commit("setErrors", {}, { root: true });
      return axios
        .post(process.env.VUE_APP_ROOT_API + "login", data)
        .then(response => {
          commit("setUserData", response.data.user);
          localStorage.setItem("token", response.data.token);
        });
    },
    sendLogoutRequest({ commit }) {

      axios.post(process.env.VUE_APP_ROOT_API + "logout").then(() => {
        commit("setUserData", null);
        localStorage.removeItem("token");
        router.push({
          name: "login"
        });
      });
    },
  }
};
