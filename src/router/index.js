import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

// views
// base
import Base from '@pages/base/'
import Home from '@pages/base/home'
// admin
import Admin from '@pages/admin/'
import ServiceReserve from '@pages/admin/services'

Vue.use(Router)
const pageWhiteList = ['/login']

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      redirect: '/home',
      component: Base,
      meta: {
        requiresAuth: false
      },
      children: [
        {
          path: 'home',
          name: 'Home',
          component: Home,
          meta: {
            requiresAuth: false
          }
        }
      ]
    },
    // admin view
    {
      path: '/admin',
      name: 'Admin',
      redirect: 'service_reserve',
      component: Admin,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '/service_reserve',
          name: 'ServiceReserve',
          component: ServiceReserve,
          meta: {
            requiresAuth: true
          }
        }
      ]
    }
  ]
})

/**
 * Router Guards
 */
router.beforeEach((to, from, next) => {
  let isAuthorized = store.state.Auth.isAuthorized || false

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (isAuthorized) {
      next()
    } else {
      next({
        path: '/',
        query: {error: 'noAuthorized'}
      })
    }
  } else {
    if (pageWhiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      if (to.path !== '/') {
        next()
      }
    }
  }
})

export default router
