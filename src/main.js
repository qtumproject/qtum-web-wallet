// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import VueI18n from 'vue-i18n'
import App from 'App'
import router from 'router'
import notify from 'notify'
import locales from 'locales'

import 'vuetify/dist/vuetify.min.css'
import './assets/less/qtum-icons.less'

Vue.use(Vuetify)
Vue.use(VueI18n)
Vue.config.productionTip = false

window.notify = notify

let locale
navigator.languages.forEach(language => {
  if (locale === undefined && locales.locales.indexOf(language) !== -1) {
    locale = language
  }
})
const i18n = new VueI18n({
  locale: locale,
  fallbackLocale: 'en',
  messages: locales.messages,
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  template: '<App/>',
  components: {
    App
  },
  data: {
    notify
  }
})
