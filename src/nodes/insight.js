import axios from 'axios'

const host = 'https://qtum.info/insight-api'

let _getRequest = function(url, callback) {
  axios.get(host + url)
    .then(function (response) {
      if (typeof callback == 'function')
        callback(response.data)
    })
  .catch(function (error) {
    console.log(error)
  })
}

export default {
  getInfo(address, callback) {
    _getRequest('/addr/'+address, callback)
  }

}
