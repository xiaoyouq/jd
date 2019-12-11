import Vue from 'vue'
import VueRouter from 'vue-router'
import index1 from '../../src/views/index.vue'
import tabbar2 from '../tabbar/tabbar2.vue'
import tabbar3 from '../tabbar/tabbar3.vue'
import tabbar4 from '../tabbar/tabbar4.vue'
import tabbar5 from '../tabbar/tabbar5.vue'
import input from '../components/input.vue'
import tabbar2Right from '../component/tabbar2Right.vue'
import register from '../component/register.vue'
import rep from '../component/rep.vue'
import re from '../component/re.vue'
import management from '../component/management.vue'
import userIndex from '../user/userIndex.vue'
import goShipping from '../user/goShipping.vue'
import goShippingPut from '../user/goShippingPut.vue'
import sppl from '../user/sppl.vue'
import redRacket from '../user/redRacket.vue'
import jdQuan from '../user/jdQuan.vue'
import dphover from '../user/dphover.vue'
import cars from '../components/cars.vue'
import accounts from '../user/accounts.vue'
import lt from '../user/lt.vue'
import userListS from '../user/userListS.vue'
import pinglun from '../user/pinglun.vue'
import inputSqs from '../user/inputSqs.vue'
import jycg from '../user/jycg.vue'
import dfk from '../user/dfk.vue'
import wdzj from '../user/wdzj.vue'
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    redirect: '/index1'
  },
  {
    path: '/input',
    name: 'input',
    component: input
  },
  {
    path: '/rep',
    name: 'rep',
    component: rep
  },
  {
    path: '/re',
    name: 're',
    component: re
  },
  {
    path: '/register',
    name: 'register',
    component: register
  },
  {
    path: '/index1',
    name: 'index1',
    component: index1
  },
  {
    path: '/tabbar2',
    name: 'tabbar2',
    component: tabbar2,
    children: [
      {
        path: '/tabbar2Right',
        name: 'tabbar2Right',
        component: tabbar2Right,
        props: true
      },
    ],
    redirect: '/tabbar2Right'
  },
  {
    path: '/tabbar3',
    name: 'tabbar3',
    component: tabbar3
  },
  {
    path: '/tabbar4',
    name: 'tabbar4',
    component: tabbar4
  },
  {
    path: '/tabbar5',
    name: 'tabbar5',
    component: tabbar5
  },
  {
    path: '/userIndex',
    name: 'userIndex',
    component: userIndex
  },
  {
    path: '/management',
    name: 'management',
    component: management
  },
  {
    path: '/goShipping',
    name: 'goShipping',
    component: goShipping
  },
  {
    path: '/goShippingPut',
    name: 'goShippingPut',
    component: goShippingPut
  },
  {
    path: '/redRacket',
    name: 'redRacket',
    component: redRacket
  },
  {
    path: '/jdQuan',
    name: 'jdQuan',
    component: jdQuan
  },
  {
    path: '/cars',
    name: 'cars',
    component: cars
  },
  {
    path: '/accounts',
    name: 'accounts',
    component: accounts
  },
  {
    path: '/jycg',
    name: 'jycg',
    component: jycg
  },
  {
    path: '/dfk',
    name: 'dfk',
    component: dfk
  },
  {
    path: '/userListS',
    name: 'userListS',
    component: userListS
  },
  {
    path: '/pinglun',
    name: 'pinglun',
    component: pinglun
  },
  {
    path: '/sppl',
    name: 'sppl',
    component: sppl
  },
  {
    path: '/dphover',
    name: 'dphover',
    component: dphover
  },
  {
    path: '/inputSqs',
    name: 'inputSqs',
    component: inputSqs
  },
  {
    path: '/lt',
    name: 'lt',
    component: lt
  },
  {
    path:'/wdzj',
    name:'wdzj',
    component:wdzj
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
