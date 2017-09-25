import bitcoin from 'bitcoinjs-lib'
import bip32 from 'bip32-utils'
import bip39 from 'bip39'

export default class Wallet {
  constructor (entropy, password) {
    this.entropy = entropy
    this.password = password
  }

  getMnemonic() {
    return bip39.entropyToMnemonic(this.entropy).split(' ')
  }

  validateMnemonic(mnemonic) {
    mnemonic = mnemonic.join(' ')
    if (bip39.validateMnemonic(mnemonic) == false) {
      return false
    }
    return mnemonic == this.getMnemonic().join(' ')
  }

  static restoreFromMnemonic(mnemonic, password) {
    mnemonic = mnemonic.join(' ')
    if (bip39.validateMnemonic(mnemonic) == false) return false
    return new Wallet(bip39.mnemonicToEntropy(mnemonic), password)
  }

  static generateNewWallet(password) {
    return Wallet.restoreFromMnemonic(bip39.generateMnemonic().split(' '), password)
  }
}
