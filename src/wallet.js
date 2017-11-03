import qtum from 'qtum-lib'
import bip32 from 'bip32-utils'
import bip39 from 'bip39'
import bigNumber from 'bignumber.js'
import server from 'server'

const unit = 'QTUM'

export default class Wallet {
  constructor(keyPair, setInfo) {
    this.keyPair = keyPair
    this.info = {
      address: this.getAddress(),
      balance: 'loading',
      unconfirmedBalance: 'loading',
    }
    this.txList = []
  }

  validateMnemonic(mnemonic, password) {
    let tempWallet = Wallet.restoreFromMnemonic(mnemonic, password)
    return this.keyPair.toWIF() == tempWallet.keyPair.toWIF()
  }

  getAddress() {
    return this.keyPair.getAddress()
  }

  getPrivKey() {
    return this.keyPair.toWIF()
  }

  init() {
    this.setInfo()
    this.setTxList()
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
      if (value.greaterThan(findTotal)) {
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
      this.init()
      if (typeof callback == 'function') callback(res)
    })
    return false
  }

  static restoreFromMnemonic(mnemonic, password) {
    //if (bip39.validateMnemonic(mnemonic) == false) return false
    let seedHex = bip39.mnemonicToSeedHex(mnemonic, password)
    let hdNode = qtum.HDNode.fromSeedHex(seedHex)
    let account = hdNode.deriveHardened(88).deriveHardened(0).deriveHardened(0)
    let keyPair = account.keyPair
    return new Wallet(keyPair)
  }

  static restoreFromMobile(mnemonic) {
    let seedHex = bip39.mnemonicToSeedHex(mnemonic)
    let hdNode = qtum.HDNode.fromSeedHex(seedHex)
    let account = hdNode.deriveHardened(88).deriveHardened(0)
    let walletList = []
    for (let i = 0; i < 10; i++) {
      let wallet = account.deriveHardened(i)
      wallet = new Wallet(wallet.keyPair)
      wallet.setInfo()
      walletList[i] = {
        wallet: wallet,
        path: i
      }
    }
    return walletList
  }

  static restoreFromWif(wif) {
    let keyPair = qtum.ECPair.fromWIF(wif)
    return new Wallet(keyPair)
  }

  static generateMnemonic() {
    return bip39.generateMnemonic()
  }
}
