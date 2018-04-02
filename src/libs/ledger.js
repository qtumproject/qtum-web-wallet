import qtumJsLib from 'qtumjs-lib'
import btcApp from '@ledgerhq/hw-app-btc'
import transportU2f from '@ledgerhq/hw-transport-u2f'
import BigNumber from 'bignumber.js'

export default class Ledger {
  constructor(app) {
    this.qtum = app
  }

  static get defaultPath() {
    return "m/44'/88'/0'/0"
  }

  static async connect() {
    const qtum = new btcApp(await transportU2f.create())
    // ensure in Qtum App
    const pubkeyRes = await qtum.getWalletPublicKey(Ledger.defaultPath)
    if (pubkeyRes.bitcoinAddress[0] !== 'Q') {
      throw 'Not Qtum App'
    }
    return new Ledger(qtum)
  }

  static async generateTx(keyPair, ledger, path, from, to, amount, fee, utxoList, rawTxFetchFunc = () => {}) {
    const amountSat = new BigNumber(amount).times(1e8)
    const feeSat = new BigNumber(fee).times(1e8)
    const pubkeyRes = await ledger.qtum.getWalletPublicKey(path)
    if (pubkeyRes.bitcoinAddress !== from) {
      throw 'Ledger can not restore the source address, please plugin the correct ledger'
    }
    let totalSelectSat = new BigNumber(0)
    const inputs = []
    const paths = []
    const selectUtxo = qtumJsLib.utils.selectTxs(utxoList, amount, fee)
    const rawTxCache = {}
    for(let i = 0; i < selectUtxo.length; i++) {
      const item = selectUtxo[i]
      if (!rawTxCache[item.hash]) {
        rawTxCache[item.hash] = await rawTxFetchFunc(item.hash)
      }
      paths.push(path)
      totalSelectSat = totalSelectSat.plus(item.value)
      inputs.push([
        await ledger.qtum.splitTransaction(rawTxCache[item.hash]),
        item.pos
      ])
    }
    const outputs = new qtumJsLib.TransactionBuilder(keyPair.network)
    outputs.addOutput(to, amountSat.toNumber())
    const changeSat = totalSelectSat.minus(amountSat).minus(feeSat)
    outputs.addOutput(from, changeSat.toNumber())
    const outputsScript = outputs.buildIncomplete().toHex().slice(10, -8)
    return await ledger.qtum.createPaymentTransactionNew(inputs, paths, undefined, outputsScript)
  }
}
