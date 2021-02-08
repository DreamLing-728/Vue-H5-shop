import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import utils from "./assets/js/utils";
// import config from "./assets/js/config";

Vue.config.productionTip = false;

Vue.prototype.$utils = utils;
// Vue.prototype.$config = config;


new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
