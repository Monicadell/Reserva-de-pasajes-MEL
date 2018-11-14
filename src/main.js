// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import Vuetify from 'vuetify'
import i18n from './locales'


import 'vuetify/dist/vuetify.min.css'
import './assets/scss/fontAwesome/css/fontawesome.css'
import './assets/scss/fontAwesome/css/all.css'
import '../static/fonts/custom.css'

Vue.use(Vuetify, {
  theme: {
    primary: '#1565c0',
    secondary: '#ff9800',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }
})

Vue.config.productionTip = false
const EventBus = new Vue()
Object.defineProperties(Vue.prototype, {
  $bus: {
    get: function () {
      return EventBus
    }
  }
})

const lang = store.state.Lang.language
if (lang) {
  i18n.locale = lang
}
console.log(i18n)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: {App},
  template: '<App/>'
})
