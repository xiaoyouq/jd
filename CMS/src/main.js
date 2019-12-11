import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.use(VueAxios, axios);
Vue.config.devtools = true

import 'vant/lib/index.css'

import elementui from 'element-ui'
Vue.use(elementui);

import Mint from 'mint-ui';
Vue.use(Mint);

Vue.config.productionTip = false;

import '../node_modules/mint-ui/lib/style.css'
import '../node_modules/mint-ui/lib/index.js'

import '../node_modules/bootstrap/dist/css/bootstrap.css'

import '../node_modules/element-ui/lib/theme-chalk/index.css'
import '../node_modules/element-ui/lib/index.js'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

