import Vue from 'vue'
import store from '../store'
import Router from 'vue-router'
import Destiny from '@/components/Destiny'
import Home from '@/components/Home'
import Login from '@/components/Login'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/destiny',
      name: 'Destiny',
      component: Destiny
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !store.state.user.isAuth) {
    next('/login')
  } else {
    next()
  }
})

export default router
