import cookie from 'js-cookie'
import locales from 'locales'

export default {
  set(key, value) {
    cookie.set(key, value, {expires: 1000})
  },
  get(key, defaultValue) {
    let value = cookie.get(key)
    if (value === undefined) {
      value = defaultValue
    }
    return value
  },
  getLan() {
    let locale = cookie.get('lan')
    navigator.languages.forEach(language => {
      if (locale === undefined && locales.locales.indexOf(language) !== -1) {
        locale = language
      }
    })
    if (locale === undefined) {
      locale = 'en'
    }
    return locale
  },
  getNetwork() {
    return this.get('network', 'mainnet')
  },
  getMode() {
    return this.get('mode', 'normal')
  }
}
