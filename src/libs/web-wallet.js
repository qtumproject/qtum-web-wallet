import Wallet from '@/libs/wallet'

let wallet = false

function getWallet() {
    return wallet
}

function setWallet(wal) {
    wallet = wal
}

async function connectLedger() {
    return await Wallet.connectLedger()
}

function getLedgerDefaultPath() {
    return Wallet.getLedgerDefaultPath()
}

function generateMnemonic() {
    return Wallet.generateMnemonic()
}

function restoreFromMnemonic(mnemonic, password) {
    return (wallet = Wallet.restoreFromMnemonic(mnemonic, password))
}

function restoreFromMobile(mnemonic) {
    return Wallet.restoreFromMobile(mnemonic)
}

function chooseMobileWallet(walletList, path) {
    return (wallet = walletList[path].wallet)
}

function restoreFromWif(wif) {
    return (wallet = Wallet.restoreFromWif(wif))
}

async function restoreHdNodeFromLedgerPath(ledger, path) {
    return await Wallet.restoreHdNodeFromLedgerPath(ledger, path)
}

function restoreFromHdNodeByPage(hdNode, start, length = 10) {
    return Wallet.restoreFromHdNodeByPage(hdNode, start, length)
}

function validateBip39Mnemonic(mnemonic) {
    return Wallet.validateBip39Mnemonic(mnemonic)
}

export default {
    getWallet,
    setWallet,
    connectLedger,
    getLedgerDefaultPath,
    generateMnemonic,
    restoreFromMnemonic,
    restoreFromMobile,
    restoreFromWif,
    restoreHdNodeFromLedgerPath,
    restoreFromHdNodeByPage,
    chooseMobileWallet,
    validateBip39Mnemonic
}
