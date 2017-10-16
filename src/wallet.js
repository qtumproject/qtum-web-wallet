import qtum from 'qtum-lib'
import bip32 from 'bip32-utils'
import bip39 from 'bip39'
import bigNumber from 'bignumber.js'
import server from 'server'

const unit = 'QTUM'

export default class Wallet {
  constructor(type, data) {
    this.type = type
    if (this.getIsMnemonic()) {
      this.mnemonic = data.mnemonic
      this.seedHex = bip39.mnemonicToSeedHex(this.mnemonic.join(' '), data.password)
      this.hdNode = qtum.HDNode.fromSeedHex(this.seedHex)
      this.account = this.hdNode.deriveHardened(88).deriveHardened(0).deriveHardened(0)
      this.keyPair = this.account.keyPair
    } else {
      this.wif = data
      this.keyPair = qtum.ECPair.fromWIF(data)
    }
    this.info = {
      address: this.getAddress(),
      balance: 'loading',
      unconfirmedBalance: 'loading',
    }
    this.setInfo()
    this.txList = []
    this.setTxList()
  }

  getIsMnemonic() {
    return this.type == 'mnemonic'
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
    return this.keyPair.getAddress()
  }

  getPrivKey() {
    return this.keyPair.toWIF()
  }

  setInfo() {
    server.currentNode().getInfo(this.getAddress(), info => {
      this.info.balance = info.balance + unit
      this.info.unconfirmedBalance = info.unconfirmedBalance + unit
    })
  }

  setTxList() {
    server.currentNode().getTxList(this.getAddress(), txList => {
      this.txList = txList
    })
  }

  generateTx(to, amount, fee, callback) {
    let from = this.getAddress()
    let selectTxs = function (unspentTransactions) {
      let value = new bigNumber(amount).plus(fee).times(1e8)
      let find = []
      let findTotal = new bigNumber(0)
      for (let i = 0; i < unspentTransactions.length; i++) {
        let tx = unspentTransactions[i]
        findTotal = findTotal.plus(tx.value)
        find[find.length] = tx
        if (findTotal.greaterThanOrEqualTo(value)) break
      }
      if (value.greaterThanOrEqualTo(findTotal)) {
        throw new Error('You do not have enough qtum for send')
      }
      return find
    };
    server.currentNode().getUtxList(from, list => {
      let inputs = selectTxs(list)
      let tx = new qtum.TransactionBuilder()
      let totalValue = new bigNumber(0)
      let value = new bigNumber(amount).times(1e8)
      let sendFee = new bigNumber(fee).times(1e8)
      for (let i = 0; i < inputs.length; i++) {
        tx.addInput(inputs[i].hash, inputs[i].pos)
        totalValue = totalValue.plus(inputs[i].value)
      }
      tx.addOutput(to, new bigNumber(value).toNumber())
      if (totalValue.minus(value).minus(sendFee).toNumber() > 0) {
        tx.addOutput(from, totalValue.minus(value).minus(sendFee).toNumber())
      }
      for (var i = 0; i < inputs.length; i++) {
        tx.sign(i, this.account.keyPair)
      }
      if (typeof callback == 'function') callback(tx.build().toHex())
    });
  }

  sendRawTx(tx, callback) {
    server.currentNode().sendRawTx(tx, res => {
      this.setInfo()
      this.setTxList()
      if (typeof callback == 'function') callback(res)
    })
    return false
  }

  static restoreFromMnemonic(mnemonic, password) {
    //if (bip39.validateMnemonic(mnemonic.join(' ')) == false) return false
    return new Wallet('mnemonic', {
      mnemonic: mnemonic,
      password: password
    })
  }

  static restoreFromWif(wif) {
    return new Wallet('wif', wif)
  }

  static generateNewWallet(password) {
    return Wallet.restoreFromMnemonic(bip39.generateMnemonic().split(' '), password)
  }
}
