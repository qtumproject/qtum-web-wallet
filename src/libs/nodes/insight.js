import axios from 'axios'
import config from 'libs/config'

let domain = ''
switch(config.get('network', 'testnet')) {
  case 'testnet':
    domain = 'https://testnet.qtum.org'
    break
  case 'mainnet':
    domain = 'https://explorer.qtum.org'
    break
}
const apiPrefix = domain + '/insight-api'
const webPrefix = domain

let _getRequest = function(url, callback) {
  axios.get(apiPrefix + url)
    .then(function (response) {
      if (typeof callback == 'function')
        callback(response.data)
    })
  .catch(function (error) {
    console.log(error)
  })
}

let _postRequest = function(url, data, callback) {
  axios.post(apiPrefix + url, data)
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
  },

  getTxList(address, callback) {
    _getRequest('/txs/?address='+address, callback)
  },

  getUtxList(address, callback) {
    _getRequest('/addr/'+address+'/utxo', function(response) {
      if (typeof callback == 'function')
        callback(response.map(item=>{
          return {
            address: item.address,
            txid: item.txid,
            confirmations: item.confirmations,
            amount: item.amount,
            value: item.satoshis,
            hash: item.txid,
            pos: item.vout
          }
        }))
    })
  },

  sendRawTx(rawTx, callback) {
    _postRequest('/tx/send', {
      rawtx: rawTx
    }, function(response) {
      if (typeof callback == 'function')
        callback(response.txid)
    })
  },

  getTxExplorerUrl(tx) {
    return domain + '/tx/' + tx
  },

  getAddrExplorerUrl(addr) {
    return domain + '/address/' + addr
  }
}
