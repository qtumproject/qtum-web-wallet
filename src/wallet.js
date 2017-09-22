import bitcoin from 'bitcoinjs-lib'
import bip32 from 'bip32-utils'
import bip39 from 'bip39'

function Wallet(entropy, password) {
  this.getMnemonic = function() {
    return bip39.entropyToMnemonic(entropy).split(' ')
  }
  this.validateMnemonic = function(mnemonic) {
    mnemonic = mnemonic.join(' ')
    if(bip39.validateMnemonic(mnemonic) == false) {
      return false
    }
    return mnemonic == this.getMnemonic().join(' ')
  }
}

Wallet.restoreFromMnemonic = function(mnemonic, password) {
  mnemonic = mnemonic.join(' ')
  if (bip39.validateMnemonic(mnemonic) == false) return false
  return new Wallet(bip39.mnemonicToEntropy(mnemonic), password)
}

Wallet.generateNewWallet = function(password) {
  return Wallet.restoreFromMnemonic(bip39.generateMnemonic().split(' '), password)
}

export default Wallet
