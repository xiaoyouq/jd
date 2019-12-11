import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    swiperq:[],//这是轮播的
    carList:[],
    routers:'/index1',
    tabbar2List:[],
    seckillList:[],
    loginImageTable:true,
    gwcList:[],
    routerObject:{},
    gwcAC1:0,
    gwcAC2:0,
    clearTime:null,
    xiaoxiList:[],
    appData:[],
    smdx:{},
    tabbar3LT:[],
    ltjv:[]
    // userIndexCode:{}
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
