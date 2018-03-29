import btcApp from '@ledgerhq/hw-app-btc'
import transportU2f from '@ledgerhq/hw-transport-u2f'

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
}
