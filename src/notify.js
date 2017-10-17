import Vue from 'vue'

let notifyList = {}
let id = 1

function addNotify(msg, type) {
  let notifyId = [msg, type].join('_')
  let notify = {msg, type}
  if (notifyList[notifyId]) {
    clearTimeout(notifyList[notifyId].timer)
  }
  Vue.set(notifyList, notifyId, notify)
  setTimeout(() => {Vue.delete(notifyList, notifyId)}, 10000)
}

export default {
  error(msg) {
    addNotify(msg, 'error')
  },
  success(msg) {
    addNotify(msg, 'success')
  },
  list: notifyList
}
