// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
import Vuetify from 'vuetify'
import VueI18n from 'vue-i18n'
import App from 'App'
import notify from 'notify'
import locales from 'locales'
import config from 'config'

import 'vuetify/dist/vuetify.min.css'
import 'assets/less/qtum-icons.less'
import 'assets/css/material-icons.css'

Vue.use(Vuetify)
Vue.use(VueI18n)
Vue.use(VueClipboard)
Vue.config.productionTip = false

window.notify = notify

const i18n = new VueI18n({
  locale: config.getLan(),
  fallbackLocale: 'en',
  messages: locales.messages,
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  template: '<App/>',
  components: {
    App
  },
  data: {
    notify
  }
})
