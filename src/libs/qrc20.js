import tokens from 'libs/token.json'
import config from 'libs/config'
import server from 'libs/server'
import abi from 'ethjs-abi'
import qtum from 'qtumjs-lib'

function loadTokenList(network) {
  let tokenList = tokens[network].concat(config.get(`tokenList_${network}`, []))
  tokenList.sort((a, b) => {
    return a.symbol > b.symbol ? 1 : -1
  })
  return tokenList
}

export default {
  getTokenList() {
    return loadTokenList(config.getNetwork())
  },

  addCustomToken(address, name, symbol, decimals) {
    const tokenList = loadTokenList(config.getNetwork())
    const has = tokenList.find(item => {
      return address === item.address
    })
    if (has) return true
    const network = config.getNetwork()
    const savedTokenList = config.get(`tokenList_${network}`, [])
    savedTokenList[savedTokenList.length] = {
      name,
      symbol,
      address,
      decimals,
    }
    config.set(`tokenList_${network}`, savedTokenList, 365 * 86400)
  },

  async fetchTokenInfo(contractAddress) {
    return await server.currentNode().getTokenInfo(contractAddress)
  },

  checkSymbol(symbol) {
    const tokenList = loadTokenList(config.getNetwork())
    return tokenList.filter((token) => {
      return token.symbol === symbol
    }).length > 0
  },

  getTokenBySymbol(symbol) {
    const tokenList = loadTokenList(config.getNetwork())
    return tokenList.filter((token) => {
      return token.symbol === symbol
    })[0]
  },

  encodeSendData(token, address, amount) {
    return 'a9059cbb' + abi.encodeParams(['address', 'uint256'], ['0x' + qtum.address.fromBase58Check(address)['hash'].toString('hex'), amount * Math.pow(10, token.decimals)]).substr(2)
  }
}
