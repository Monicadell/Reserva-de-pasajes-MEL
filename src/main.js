// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import Vuetify from 'vuetify'
import i18n from './locales'
var VueScrollTo = require('vue-scrollto');
import moment from 'moment'
//import VueSweetalert2 from 'vue-sweetalert2';
import VueSweetAlert from 'vue-sweetalert'
 
Vue.use(VueSweetAlert)


import 'vuetify/dist/vuetify.min.css'
import './assets/scss/fontAwesome/css/fontawesome.css'
import './assets/scss/fontAwesome/css/all.css'
import '../static/fonts/custom.css'

Vue.prototype.moment = moment
//Vue.use(VueSweetalert2);


Vue.use(VueScrollTo)
Vue.use(Vuetify, {
  theme: {
    primary: '#1565c0',
    secondary: '#ff9800',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107',
    naranjo: '#E66732',
    calendario: '#FFC107'
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

