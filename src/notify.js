import Vue from 'vue'

let notifyList = {}
let id = 1

function addNotify(msg, type) {
  let notifyId = id++
  Vue.set(notifyList, notifyId, {msg, type})
  setTimeout(() => {Vue.delete(notifyList, notifyId)}, 10000)
}

export default {
  error(msg) {
    addNotify(msg, 'error')
  },
  list: notifyList
}
