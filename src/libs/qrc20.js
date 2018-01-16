import tokens from 'libs/token.json'
import config from 'libs/config'
import abi from 'ethjs-abi'
import qtum from 'qtumjs-lib'

let tokenList = tokens[config.getNetwork()]

export default {
  getTokenList() {
    return tokenList
  },

  checkSymbol(symbol) {
    return tokenList.filter((token) => {return token.symbol == symbol}).length > 0
  },

  getTokenBySymbol(symbol) {
    return tokenList.filter((token) => {return token.symbol == symbol})[0]
  },

  encodeSendData(token, address, amount) {
    return 'a9059cbb' + abi.encodeParams(['address', 'uint256'], ['0x'+qtum.address.fromBase58Check(address)['hash'].toString('hex'), amount * Math.pow(10, token.decimals)]).substr(2)
  }
}
