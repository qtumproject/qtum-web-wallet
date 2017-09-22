import Wallet from './wallet'

var wallet = false

function getWallet() {
  return wallet
}

function generateWallet(password) {
  wallet = Wallet.generateNewWallet(password)
  return wallet
}

function restoreFromMnemonic(mnemonic, password) {
  wallet = Wallet.restoreFromMnemonic(mnemonic, password)
  return wallet
}

export default {
  getWallet: getWallet,
  generateWallet: generateWallet,
  restoreFromMnemonic: restoreFromMnemonic,
}
