// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
import Vuetify from 'vuetify'
import { Upload } from 'element-ui'
import App from './App.vue'

import 'vuetify/dist/vuetify.min.css'
import './assets/less/qtum-icons.less'
import './assets/css/material-icons.css'
import './assets/css/main.css'

Vue.use(Vuetify)
Vue.use(VueClipboard)
Vue.component('uploader', Upload)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue(App).$mount('#app')
