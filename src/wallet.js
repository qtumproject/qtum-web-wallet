import qtum from './qtum-lib'
import bip32 from 'bip32-utils'
import bip39 from 'bip39'
import server from './server'

const unit = 'QTUM'

export default class Wallet {
  constructor (mnemonic, password) {
    this.mnemonic = mnemonic
    this.seedHex = bip39.mnemonicToSeedHex(this.mnemonic.join(' '), password)
    this.hdNode = qtum.HDNode.fromSeedHex(this.seedHex)
    this.account = this.hdNode.deriveHardened(88).deriveHardened(0).deriveHardened(0)
    this.setInfo()
    this.info = {
      address: this.getAddress(),
      balance: 'loading',
      unconfirmedBalance: 'loading',
    }
  }

  getMnemonic() {
    return this.mnemonic
  }

  validateMnemonic(mnemonic) {
    mnemonic = mnemonic.join(' ')
    if (bip39.validateMnemonic(mnemonic) == false) {
      return false
    }
    return mnemonic == this.mnemonic.join(' ')
  }

  getAddress() {
    return this.account.getAddress()
  }

  getInfo() {
    return this.info
  }

  setInfo() {
    server.currentNode().getInfo(this.getAddress(), (info) => {
      this.info.balance = info.balance + unit
      this.info.unconfirmedBalance = info.unconfirmedBalance + unit
    })
  }

  static restoreFromMnemonic(mnemonic, password) {
    if (bip39.validateMnemonic(mnemonic.join(' ')) == false) return false
    return new Wallet(mnemonic, password)
  }

  static generateNewWallet(password) {
    return Wallet.restoreFromMnemonic(bip39.generateMnemonic().split(' '), password)
  }
}
