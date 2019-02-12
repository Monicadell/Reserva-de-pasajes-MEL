// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import Vuetify from 'vuetify'
import i18n from './locales'
import moment from 'moment'
import VueSweetalert2 from 'vue-sweetalert2'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import 'vuetify/dist/vuetify.min.css'
import './assets/scss/fontAwesome/css/fontawesome.css'
import './assets/scss/fontAwesome/css/all.css'
import '../static/fonts/custom.css'
import HighchartsVue from 'highcharts-vue'
const VueScrollTo = require('vue-scrollto')

Vue.prototype.moment = moment
Vue.use(VueSweetalert2)
Vue.use(VueScrollTo)
Vue.use(HighchartsVue)
Vue.use(Vuetify, {
  theme: {
    primary: '#E66732',
    secondary: '#1565c0',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107',
    naranjo: '#ff9800',
    calendario: '#FFC107',
    gris: '#646464'
  }
})
Vue.use(VueAwesomeSwiper)

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
