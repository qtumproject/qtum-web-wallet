import Vue from 'vue'

var notifyList = {}
var id = 1

function addNotify(msg, type) {
  var notifyId = id++
  Vue.set(notifyList, notifyId, {msg: msg, type: type})
  setTimeout(function() {Vue.delete(notifyList, notifyId)}, 10000)
}

export default {
  error: function(msg){
    addNotify(msg, 'error')
  },
  list: notifyList
}
