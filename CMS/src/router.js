import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import home from '../src/components/home.vue'
import login from './views/login.vue'
import user1 from './components/coments/user1.vue'
import user2 from './components/coments/user2.vue'
import user3 from './components/coments/user3.vue'
import user4 from './components/coments/user4.vue'
import user21 from './components/coments/list/user21.vue'
import user22 from './components/coments/list/user22.vue'
import user23 from './components/coments/list/user23.vue'
import user24 from './components/coments/list/user24.vue'
import user26 from './components/coments/list/user26.vue'
import user27 from './components/coments/list/user27.vue'
import user28 from './components/coments/list/user28.vue'
import jbzl from './components/coments/user4Coments/jbzl.vue'
import grxh from './components/coments/user4Coments/grxh.vue'
import xgzl from './components/coments/user4Coments/xgzl.vue'
import xgmm from './components/coments/user4Coments/xgmm.vue'
import wszl from './components/coments/user4Coments/wszl.vue'
import sz from './components/coments/user4Coments/sz.vue'
import board from './components/coments//user4Coments/board.vue'
import viewMore from './components/coments/viewMore.vue'
import NewsDetails from './components/coments/NewsDetails.vue'
Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/login",
      name: "login",
      component: login
    },
    
    {
      path: "/home",
      name: "home",
      component: home,
      children:[
        {
          path: "/",
          name: "user44",
          component: user1
        },
        {
          path: "/NewsDetails",
          name: "NewsDetails",
          component: NewsDetails
        },
        {
          path: "/board",
          name: "board",
          component: board
        },
        {
          path: "/viewMore",
          name: "viewMore",
          component: viewMore
        },
        {
          path: "/user1",
          name: "user1",
          component: user1
        },
        {
          path: "/user2",
          name: "user2",
          component: user2
        },
        {
          path: "/user3",
          name: "user3",
          component: user3
        },
        {
          path: "/user4",
          name: "user4",
          component: user4,
          // user4 的子级路由
          children:[
            {
              path:'/',
              name:'jbzl',
              component:jbzl
            },
            {
              path:'grxh',
              name:'grxh',
              component:grxh
            },
            {
              path:'xgzl',
              name:'xgzl',
              component:xgzl
            },
            {
              path:'xgmm',
              name:'xgmm',
              component:xgmm
            },
            {
              path:'wszl',
              name:'wszl',
              component:wszl
            },
            {
              path:'sz',
              name:'sz',
              component:sz
            },
          ]
        },
        {
          path: "/user21",
          name: "user21",
          component: user21
        },
        {
          path: "/user22",
          name: "user22",
          component: user22
        },
        {
          path: "/user23",
          name: "user23",
          component: user23
        },
        {
          path: "/user24",
          name: "user24",
          component: user24
        },
        {
          path: "/user26",
          name: "user26",
          component: user26
        },
        {
          path: "/user27",
          name: "user27",
          component: user27
        },{
          path: "/user28",
          name: "user28",
          component: user28
        },
      ]
    },
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () =>
    //     import(/* webpackChunkName: "about" */ "./views/About.vue")
    // }
  ]
});
