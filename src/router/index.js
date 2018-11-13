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
import Users from '@pages/admin/users'
import Frecuencias from '@pages/admin/frecuencias'
import Manifiestos from '@pages/admin/manifiestos'
import Conductores from '@pages/admin/conductores'
import Buses from '@pages/admin/buses'
import Servicios from '@pages/admin/servicios'
import Recorridos from '@pages/admin/recorridos'
import Estaciones from '@pages/admin/estaciones'
import MyInfo from '@pages/admin/myInfo'

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
        },
        {
          path: '/users',
          name: 'Users',
          component: Users
        },
        {
          path: '/frecuencias',
          name: 'Frecuencias',
          component: Frecuencias
        },
        {
          path: '/manifiestos',
          name: 'Manifiestos',
          component: Manifiestos
        },
        {
          path: '/conductores',
          name: 'Conductores',
          component: Conductores
        },
        {
          path: '/buses',
          name: 'Buses',
          component: Buses
        },
        {
          path: '/servicios',
          name: 'Servicios',
          component: Servicios
        },
        {
          path: '/tramos',
          name: 'Recorridos',
          component: Recorridos
        },
        {
          path: '/estaciones',
          name: 'Estaciones',
          component: Estaciones
        },
        {
          path: '/myInfo',
          name: 'MyInfo',
          component: MyInfo
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
