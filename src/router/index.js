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
import Solicitudes from '@pages/admin/solicitudes'
import Frecuencias from '@pages/admin/frecuencias'
import Manifiestos from '@pages/admin/manifiestos'
import Empleados from '@pages/admin/empleados'
import Buses from '@pages/admin/buses'
import Servicios from '@pages/admin/servicios'
import Recorridos from '@pages/admin/recorridos'
import Estaciones from '@pages/admin/estaciones'
import MyInfo from '@pages/admin/myInfo'
import Reservas from '@pages/admin/misreservas'
import ReservasTerceros from '@pages/admin/misreservasTerceros'

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
          component: Users,
          meta: {
            requiresAuth: true,
            adminAuth: true
          }
        },
        {
          path: '/solicitudes',
          name: 'Solicitudes',
          component: Solicitudes,
          meta: {
            requiresAuth: true,
            adminAuth: true
          }
        },
        {
          path: '/frecuencias',
          name: 'Frecuencias',
          component: Frecuencias,
          meta: {
            requiresAuth: true,
            adminAuth: true
          }
        },
        {
          path: '/manifiestos',
          name: 'Manifiestos',
          component: Manifiestos,
          meta: {
            requiresAuth: true,
            adminAuth: true
          }
        },
        {
          path: '/empleados',
          name: 'Empleados',
          component: Empleados,
          meta: {
            requiresAuth: true,
            adminAuth: true
          }
        },
        {
          path: '/buses',
          name: 'Buses',
          component: Buses,
          meta: {
            requiresAuth: true,
            adminAuth: true
          }
        },
        {
          path: '/servicios',
          name: 'Servicios',
          component: Servicios,
          meta: {
            requiresAuth: true,
            adminAuth: true
          }
        },
        {
          path: '/tramos',
          name: 'Recorridos',
          component: Recorridos,
          meta: {
            requiresAuth: true,
            adminAuth: true
          }
        },
        {
          path: '/estaciones',
          name: 'Estaciones',
          component: Estaciones,
          meta: {
            requiresAuth: true,
            adminAuth: true
          }
        },
        {
          path: '/myInfo',
          name: 'MyInfo',
          component: MyInfo,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/misreservas',
          name: 'Reservas',
          component: Reservas,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/reservaterceros',
          name: 'reservaterceros',
          component: ServiceReserve,
          meta: {
            requiresAuth: true,
            adminAuth: true,
            callcenterAuth: true
          }
        },
        {
          path: '/misreservasaterceros',
          name: 'misreservasaterceros',
          component: ReservasTerceros,
          meta: {
            requiresAuth: true,
            adminAuth: true,
            callcenterAuth: true
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
  let isAdmin = (store.state.Auth.role === 2)
  let isCallCenter = (store.state.Auth.role === 5)
  let isFirstTime = (store.state.Auth.connection === '')
  console.log('primera vez', isFirstTime)
  if (to.matched.some(record => record.meta.callcenterAuth)) { // verifica que es Administrador
    if (isAdmin && isAuthorized) {
      next()
    } else if (isCallCenter) {
      next()
    } else {
      next({
        path: '/',
        query: {error: 'noAuthorized'}
      })
    }
  } else if (to.matched.some(record => record.meta.adminAuth)) { // verifica que es Call Center
    if (isAdmin && isAuthorized) {
      next()
    } else {
      next({
        path: '/',
        query: {error: 'noAuthorized'}
      })
    }
  } else if (to.matched.some(record => record.meta.requiresAuth)) { // verifica que es Usuario Registrado
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
