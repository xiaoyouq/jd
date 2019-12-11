import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'



// 引入地区选择器 v-distpicker
import VDistpicker from 'v-distpicker'
Vue.component('v-distpicker', VDistpicker)


// 引入cokkies 
import Vuecokkies from 'vue-cookies'
Vue.use(Vuecokkies)



Vue.config.productionTip = false
// 配置axios
import axios from 'axios'
Vue.prototype.$axios = axios

// 配置element-ui和mint-ui
import elementui from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/index.js'
Vue.use(elementui)
import mintUi from 'mint-ui'
import 'mint-ui/lib/style.css'
import 'mint-ui/lib/index.js'
Vue.use(mintUi)


//配置swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import 'swiper/js/swiper.js'
Vue.use(VueAwesomeSwiper, /* { default global options } */)


// 引入better-scroll
// import BScroll from 'better-scroll'
// import 'better-scroll/dist/bscroll.js'
// Vue.use(BScroll)


// 配置swiper
import iview from 'iview'
import 'iview/dist/styles/iview.css'
Vue.use(iview);


import Router from 'vue-router'
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
return routerPush.call(this, location).catch(error=> error)
}

// 引入mui
import './lib/mui-master/dist/css/mui.css'

// 引入vant
import 'vant/lib/index.css'
import 'vant/lib/index.js'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
