import Vue from 'vue'
import VueI18n from 'vue-i18n'
import locales from '@/locales'
import config from '@/libs/config'

Vue.use(VueI18n)

export default new VueI18n({
    locale: config.getLan(),
    fallbackLocale: 'en',
    messages: locales.messages
})
