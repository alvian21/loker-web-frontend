// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import VueToast from 'vue-toast-notification';
import axios from 'axios';
import store from "./store";
import VueAxios from 'vue-axios';
import Vuesax from 'vuesax'
import VueSession from "vue-session";
import Vuetify from 'vuetify'
import ToastPlugin from 'vue-toast-notification';
import vuetify from './plugins/vuetify'
//import 'vue-toast-notification/dist/theme-default.css';
import 'vue-toast-notification/dist/theme-sugar.css';
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import swal from 'sweetalert';


Vue.config.productionTip = false
Vue.use(ToastPlugin, {
  // One of the options
  position: 'top'
})
Vue.use(BootstrapVue)
Vue.use(VueAxios, axios);
Vue.use(VueSession);
Vue.use(Vuesax);
Vue.use(Vuetify)
Vue.use(router)

axios.interceptors.response.use(
  response => {
    if(response.data.code === "ERR_ACCESS"){
      store.commit("auth/setUserData", null);
      localStorage.removeItem("token");
      router.push({ name: "login" });
    }

    return response;
  },
  error => {
    console.log(error);
    if (error.response.status === 422) {
      store.commit("setErrors", error.response.data.errors);
    } else if (error.data.code === "ERR_ACCESS") {
      store.commit("auth/setUserData", null);
      localStorage.removeItem("token");
      router.push({ name: "login" });
    } else {
      store.commit("setErrors", error.response.data ? error.response.data: error);
      return Promise.reject(error);
    }
  }
);


axios.interceptors.request.use(function (config) {
  config.headers.Authorization = localStorage.getItem("token");
  return config;
}, function (error) {

  return Promise.reject(error)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  vuetify,
  components: { App },
  template: '<App/>'
})
