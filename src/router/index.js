import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Accounts from '../views/Accounts.vue'
import NotFounded from '../views/NotFounded.vue'
import Store from '../store/index.js'
import Transaction from '../views/Transaction.vue'
import Savings from '../views/Savings.vue'
import Statistic from '../views/Statistic.vue'
import Profil from '../components/Profil.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  // {
  //   path: '/home',
  //   name: 'Home',
  //   component: Home
  // },
  {

    path: '/register',
    component: Register
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/profil',
    component: Profil,
    beforeEnter: (to, from, next) => {
      if (Store.state.isLoggedIn) {
        next();
      } else {
        console.log(to, from)
        next("/")
      }
    }
  },
  {
    path: '/transaction',
    component: Transaction,
    beforeEnter: (to, from, next) => {
      if (Store.state.isLoggedIn) {
        next();
      } else {
        console.log(to, from)
        next("/")
      }
    }
  },
  {
    path: '/savings',
    component: Savings,
    beforeEnter: (to, from, next) => {
      if (Store.state.isLoggedIn) {
        next();
      } else {
        console.log(to, from)
        next("/")
      }
    }
  },
  {
    path: '/statistic',
    component: Statistic,
    beforeEnter: (to, from, next) => {
      if (Store.state.isLoggedIn) {
        next();
      } else {
        console.log(to, from)
        next("/")
      }
    }
  },
  {
    path: '*',
    component: NotFounded
  },
  {
    path: '/accounts',
    component: Accounts,
    beforeEnter: (to, from, next) => {
      if (Store.state.isLoggedIn) {
        next();
      } else {
        console.log(to, from)
        next("/")
      }
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
