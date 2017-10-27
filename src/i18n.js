import Vue from 'vue'
import VueI18n from 'vue-i18n'
import config from 'config'
import locales from 'locales'

Vue.use(VueI18n)

export default new VueI18n({
  locale: config.getLan(),
  fallbackLocale: 'en',
  messages: locales.messages,
})
