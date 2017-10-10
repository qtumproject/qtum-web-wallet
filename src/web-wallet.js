import Wallet from 'wallet'

let wallet = false

function getWallet() {
  return wallet
}

function generateWallet(password) {
  return wallet = Wallet.generateNewWallet(password)
}

function restoreFromMnemonic(mnemonic, password) {
  return wallet = Wallet.restoreFromMnemonic(mnemonic, password)
}

export default {
  getWallet,
  generateWallet,
  restoreFromMnemonic,
}
