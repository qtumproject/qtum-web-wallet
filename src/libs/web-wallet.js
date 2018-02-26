import Wallet from 'libs/wallet'

let wallet = false

function getWallet() {
  return wallet
}

function generateMnemonic() {
  return Wallet.generateMnemonic()
}

function restoreFromMnemonic(mnemonic, password) {
  return wallet = Wallet.restoreFromMnemonic(mnemonic, password)
}

function restoreFromMobile(mnemonic) {
  return Wallet.restoreFromMobile(mnemonic)
}

function chooseMobileWallet(walletList, path) {
  return wallet = walletList[path].wallet
}

function restoreFromWif(wif) {
  return wallet = Wallet.restoreFromWif(wif)
}

function validateBip39Mnemonic(mnemonic) {
  return Wallet.validateBip39Mnemonic(mnemonic);
}

export default {
  getWallet,
  generateMnemonic,
  restoreFromMnemonic,
  restoreFromMobile,
  restoreFromWif,
  chooseMobileWallet,
  validateBip39Mnemonic
}
