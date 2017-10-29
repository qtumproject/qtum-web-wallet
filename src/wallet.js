import qtum from 'qtum-lib'
import bip32 from 'bip32-utils'
import bip39 from 'bip39'
import bigNumber from 'bignumber.js'
import server from 'server'
import config from 'config'

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
    this.txList = []
    if (config.getMode() != 'offline') {
      this.setInfo()
      this.setTxList()
    }
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
    server.currentNode().getUtxList(from, list => {
      let tx = Wallet.generateTx(this, to, amount, fee, list)
      if (typeof callback == 'function') callback(tx)
    })
  }
  
  sendRawTx(tx, callback) {
    Wallet.sendRawTx(tx, res => {
      this.setInfo()
      this.setTxList()
      if (typeof callback == 'function') callback(res)
    })
  }

  static generateTx(wallet, to, amount, fee, utxoList) {
    let selectTxs = function (unspentTransactions) {
      //sort the utxo
      let matureList = []
      let immatureList = []
      for(let i = 0; i < unspentTransactions.length; i++) {
        if(unspentTransactions[i].confirmations >= 500) {
          matureList[matureList.length] = unspentTransactions[i]
        }
        else {
          immatureList[matureList.length] = unspentTransactions[i]
        }
      }
      matureList.sort((a, b) => {return a.value - b.value})
      immatureList.sort((a, b) => {return b.confirmations - a.confirmations})
      unspentTransactions = matureList.concat(immatureList)

      let value = new bigNumber(amount).plus(fee).times(1e8)
      let find = []
      let findTotal = new bigNumber(0)
      for (let i = 0; i < unspentTransactions.length; i++) {
        let tx = unspentTransactions[i]
        findTotal = findTotal.plus(tx.value)
        find[find.length] = tx
        if (findTotal.greaterThanOrEqualTo(value)) break
      }
      if (value.greaterThan(findTotal)) {
        throw new Error('You do not have enough qtum for send')
      }
      return find
    }
    let from = wallet.getAddress()
    let inputs = selectTxs(utxoList)
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
      tx.sign(i, wallet.keyPair)
    }
    return tx.build().toHex()
  }

  static sendRawTx(tx, callback) {
    server.currentNode().sendRawTx(tx, callback)
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
