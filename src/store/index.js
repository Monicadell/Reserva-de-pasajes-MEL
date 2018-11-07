/**
 * Import Dependency
 */
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

/**
 * Root Scope of VUEX
 */

/**
 * Module Scope of VUEX
 */
import Auth from './modules/Auth'
import Lang from './modules/Lang'
import Media from './modules/Media'
import Home from './modules/Home'
import Booking from './modules/Booking'

/**
 * Config
 */
Vue.use(Vuex)

/**
 * Export
 */
export default new Vuex.Store({
  plugins: [createPersistedState()],
  modules: {
    Lang: Lang,
    Auth: Auth,
    Media: Media,
    Home: Home,
    Booking: Booking
  }
})
