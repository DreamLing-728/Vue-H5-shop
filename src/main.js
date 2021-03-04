import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import utils from "./assets/js/utils";
// import config from "./assets/js/config";
import ElementUI from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;

Vue.prototype.$utils = utils;
Vue.use(ElementUI, {size: 'small'});
// Vue.prototype.$config = config;


new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
