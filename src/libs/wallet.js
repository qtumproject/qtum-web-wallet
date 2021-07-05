import qtum from 'qtumjs-lib'
import bip39 from 'bip39'
import abi from 'ethjs-abi'
import secp256k1 from 'secp256k1'
import BigNumber from 'bignumber.js'
import ledger from '@/libs/ledger'
import server from '@/libs/server'
import config from '@/libs/config'
import { sha256d } from '@/libs/hash'
import { Buffer } from 'buffer'

const unit = 'QTUM'
let network = {}
switch (config.getNetwork()) {
    case 'testnet':
        network = qtum.networks.qtum_testnet
        break
    case 'mainnet':
        network = qtum.networks.qtum
        break
}

const satPos = 8

export default class Wallet {
    constructor(keyPair, extend = {}) {
        this.keyPair = keyPair
        this.extend = extend
        this.info = {
            address: this.getAddress(),
            balance: 'loading',
            unconfirmedBalance: 'loading',
            qrc20: [],
            superStaker: '',
            fee: '',
            delegateStatus: 'none'
        }
        this.txList = []
    }

    validateMnemonic(mnemonic, password) {
        let tempWallet = Wallet.restoreFromMnemonic(mnemonic, password)
        return this.keyPair.toWIF() === tempWallet.keyPair.toWIF()
    }

    getAddress() {
        return this.keyPair.getAddress()
    }

    getHasPrivKey() {
        return !!this.keyPair.d
    }

    getPrivKey() {
        try {
            return this.keyPair.toWIF()
        } catch (e) {
            if (e.toString() === 'Error: Missing private key') {
                return null
            } else {
                throw e
            }
        }
    }

    init() {
        if (config.getMode() !== 'offline') {
            this.setInfo().then()
            this.setTxList().then()
        }
    }

    async update() {
        const res = await Promise.all([this.setInfo(), this.setTxList()])
        return res
    }

    signMessage(message) {
        const hash = sha256d(
            Buffer.concat([
                Buffer.from(this.keyPair.network.messagePrefix, 'utf8'),
                Buffer.from([message.length]),
                Buffer.from(message, 'utf8')
            ])
        )
        const { signature, recovery } = secp256k1.sign(
            hash,
            this.keyPair.d.toBuffer()
        )
        return Buffer.concat([
            Buffer.from([recovery + (this.keyPair.compressed ? 31 : 27)]),
            signature
        ])
    }

    async setInfo() {
        const info = await server.currentNode().getInfo(this.info.address)
        this.info.balance = Wallet.changeUnitFromSatTo1(info.balance) + unit
        this.info.unconfirmedBalance =
            Wallet.changeUnitFromSatTo1(info.unconfirmed) + unit
        this.info.qrc20 = info.qrc20Balances.map(token => {
            token.balance = Wallet.changeUnitFromSatTo1(
                token.balance,
                token.decimals
            )
            return token
        })

        if (info.superStaker) {
            switch (this.info.delegateStatus) {
                case 'delDelegation':
                    this.setDelegation(null, null)
                    break
                case 'addDelegation':
                case 'none':
                    this.setDelegation(info.superStaker, info.fee)
                    this.setDelegationStatus('delegated')
                    break
            }
        } else {
            switch (this.info.delegateStatus) {
                case 'none':
                case 'addDelegation':
                    break
                case 'delDelegation':
                    this.setDelegationStatus('none')
                    break
            }
        }
    }

    // 设置代理信息
    setDelegation(superStaker, fee) {
        this.info.superStaker = superStaker
        this.info.fee = fee
    }

    // 设置代理状态（是否被确认）
    setDelegationStatus(status) {
        this.info.delegateStatus = status
    }

    async setTxList() {
        this.txList = await server.currentNode().getTxList(this.info.address)
    }

    async generateCreateTokenTx(
        name,
        symbol,
        decimal,
        totalSupply1,
        gasLimit,
        gasPrice,
        fee
    ) {
        return Wallet.generateCreateTokenTx(
            this,
            name,
            symbol,
            decimal,
            totalSupply1,
            gasLimit,
            gasPrice,
            fee,
            await server.currentNode().getUtxoList(this.info.address)
        )
    }

    async generateCreateContractTx(code, gasLimit, gasPrice, fee) {
        return Wallet.generateCreateContractTx(
            this,
            code,
            gasLimit,
            gasPrice,
            fee,
            await server.currentNode().getUtxoList(this.info.address)
        )
    }

    async generateSendToContractTx(
        contractAddress,
        encodedData,
        gasLimit,
        gasPrice,
        fee
    ) {
        return await Wallet.generateSendToContractTx(
            this,
            contractAddress,
            encodedData,
            gasLimit,
            gasPrice,
            fee,
            await server.currentNode().getUtxoList(this.info.address)
        )
    }

    async generateTx(to, amount, fee) {
        return await Wallet.generateTx(
            this,
            to,
            amount,
            fee,
            await server.currentNode().getUtxoList(this.info.address)
        )
    }

    async sendRawTx(tx) {
        const res = await Wallet.sendRawTx(tx)
        this.init()
        return res
    }

    async callContract(address, encodedData) {
        return await Wallet.callContract(address, encodedData)
    }

    validateAddress(address) {
      let reg
      switch (config.getNetwork()) {
        case 'testnet':
            reg = /^q\w{33}/g
            return reg.test(address)
        case 'mainnet':
            reg = /^Q\w{33}/g
            return reg.test(address)
      }
      return false
    }

    static generateCreateTokenTx(
        wallet,
        name,
        symbol,
        decimal,
        totalSupply1,
        gasLimit,
        gasPrice,
        fee,
        utxoList
    ) {
        const qrc20TokenCode =
            '60606040526020604051908101604052806000815250600090805190602001906200002c929190620001b5565b5060206040519081016040528060008152506001908051906020019062000055929190620001b5565b506000600260006101000a81548160ff021916908360ff160217905550600060035534156200008357600080fd5b60405162000fa438038062000fa4833981016040528080518201919060200180518201919060200180519060200190919080519060200190919050508360009080519060200190620000d7929190620001b5565b508260019080519060200190620000f0929190620001b5565b5081600260006101000a81548160ff021916908360ff16021790555080600381905550600354600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055503373ffffffffffffffffffffffffffffffffffffffff1660007fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef6003546040518082815260200191505060405180910390a35050505062000264565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10620001f857805160ff191683800117855562000229565b8280016001018555821562000229579182015b82811115620002285782518255916020019190600101906200020b565b5b5090506200023891906200023c565b5090565b6200026191905b808211156200025d57600081600090555060010162000243565b5090565b90565b610d3080620002746000396000f3006060604052600436106100a4576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306fdde03146100a9578063095ea7b31461013757806318160ddd1461019157806323b872dd146101ba578063313ce567146102335780635a3b7e421461026257806370a08231146102f057806395d89b411461033d578063a9059cbb146103cb578063dd62ed3e14610425575b600080fd5b34156100b457600080fd5b6100bc610491565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156100fc5780820151818401526020810190506100e1565b50505050905090810190601f1680156101295780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561014257600080fd5b610177600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610539565b604051808215151515815260200191505060405180910390f35b341561019c57600080fd5b6101a46106e9565b6040518082815260200191505060405180910390f35b34156101c557600080fd5b610219600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff169060200190919080359060200190919050506106f3565b604051808215151515815260200191505060405180910390f35b341561023e57600080fd5b6102466109d3565b604051808260ff1660ff16815260200191505060405180910390f35b341561026d57600080fd5b6102756109ea565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156102b557808201518184015260208101905061029a565b50505050905090810190601f1680156102e25780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34156102fb57600080fd5b610327600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610a23565b6040518082815260200191505060405180910390f35b341561034857600080fd5b610350610a3b565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610390578082015181840152602081019050610375565b50505050905090810190601f1680156103bd5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34156103d657600080fd5b61040b600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610ae3565b604051808215151515815260200191505060405180910390f35b341561043057600080fd5b61047b600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610c94565b6040518082815260200191505060405180910390f35b610499610cf0565b60008054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561052f5780601f106105045761010080835404028352916020019161052f565b820191906000526020600020905b81548152906001019060200180831161051257829003601f168201915b5050505050905090565b60008260008173ffffffffffffffffffffffffffffffffffffffff161415151561056257600080fd5b60008314806105ed57506000600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054145b15156105f857600080fd5b82600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508373ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925856040518082815260200191505060405180910390a3600191505092915050565b6000600354905090565b60008360008173ffffffffffffffffffffffffffffffffffffffff161415151561071c57600080fd5b8360008173ffffffffffffffffffffffffffffffffffffffff161415151561074357600080fd5b6107c9600560008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205485610cb9565b600560008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610892600460008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205485610cb9565b600460008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555061091e600460008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205485610cd2565b600460008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508473ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef866040518082815260200191505060405180910390a36001925050509392505050565b6000600260009054906101000a900460ff16905090565b6040805190810160405280600981526020017f546f6b656e20302e31000000000000000000000000000000000000000000000081525081565b60046020528060005260406000206000915090505481565b610a43610cf0565b60018054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610ad95780601f10610aae57610100808354040283529160200191610ad9565b820191906000526020600020905b815481529060010190602001808311610abc57829003601f168201915b5050505050905090565b60008260008173ffffffffffffffffffffffffffffffffffffffff1614151515610b0c57600080fd5b610b55600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205484610cb9565b600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610be1600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205484610cd2565b600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508373ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef856040518082815260200191505060405180910390a3600191505092915050565b6005602052816000526040600020602052806000526040600020600091509150505481565b6000818310151515610cc757fe5b818303905092915050565b6000808284019050838110151515610ce657fe5b8091505092915050565b6020604051908101604052806000815250905600a165627a7a72305820b4801b60642dbdf96ab8aeb750302c39320e18dfedd0c1bf9c8efb3d3d41701d0029'
        if (
            new BigNumber(totalSupply1)
            .times(new BigNumber(10).pow(decimal))
            .greaterThanOrEqualTo(new BigNumber(2).pow(256))
        ) {
            alert('Total supply is overflowed in uint256')
            return false
        }
        const encodedParam = abi.encodeParams(
            ['string', 'string', 'uint8', 'uint256'], [
                name,
                symbol,
                decimal,
                '0x' +
                new BigNumber(totalSupply1)
                .times(new BigNumber(10).pow(decimal))
                .toString(16)
            ]
        )
        return qtum.utils.buildCreateContractTransaction(
            wallet.keyPair,
            qrc20TokenCode + encodedParam.substr(2),
            gasLimit,
            gasPrice,
            fee,
            utxoList
        )
    }

    static generateCreateContractTx(
        wallet,
        code,
        gasLimit,
        gasPrice,
        fee,
        utxoList
    ) {
        return qtum.utils.buildCreateContractTransaction(
            wallet.keyPair,
            code,
            gasLimit,
            gasPrice,
            fee,
            utxoList
        )
    }

    static async generateSendToContractTx(
        wallet,
        contractAddress,
        encodedData,
        gasLimit,
        gasPrice,
        fee,
        utxoList
    ) {
        if (!wallet.getHasPrivKey()) {
            if (wallet.extend.ledger) {
                return await ledger.generateSendToContractTx(
                    wallet.keyPair,
                    wallet.extend.ledger.ledger,
                    wallet.extend.ledger.path,
                    wallet.info.address,
                    contractAddress,
                    encodedData,
                    gasLimit,
                    gasPrice,
                    fee,
                    utxoList,
                    server.currentNode().fetchRawTx
                )
            }
        }
        return qtum.utils.buildSendToContractTransaction(
            wallet.keyPair,
            contractAddress,
            encodedData,
            gasLimit,
            gasPrice,
            fee,
            utxoList
        )
    }

    static async generateTx(wallet, to, amount, fee, utxoList) {
        if (!wallet.getHasPrivKey()) {
            if (wallet.extend.ledger) {
                return await ledger.generateTx(
                    wallet.keyPair,
                    wallet.extend.ledger.ledger,
                    wallet.extend.ledger.path,
                    wallet.info.address,
                    to,
                    amount,
                    fee,
                    utxoList,
                    server.currentNode().fetchRawTx
                )
            }
        }
        return qtum.utils.buildPubKeyHashTransaction(
            wallet.keyPair,
            to,
            amount,
            fee,
            utxoList
        )
    }

    static async sendRawTx(tx) {
        return await server.currentNode().sendRawTx(tx)
    }

    static async callContract(address, encodedData) {
        return await server.currentNode().callContract(address, encodedData)
    }

    static validateBip39Mnemonic(mnemonic) {
        return bip39.validateMnemonic(mnemonic)
    }

    static restoreFromMnemonic(mnemonic, password) {
        //if (bip39.validateMnemonic(mnemonic) == false) return false
        const seedHex = bip39.mnemonicToSeedHex(mnemonic, password)
        const hdNode = qtum.HDNode.fromSeedHex(seedHex, network)
        const account = hdNode
            .deriveHardened(88)
            .deriveHardened(0)
            .deriveHardened(0)
        const keyPair = account.keyPair
        return new Wallet(keyPair)
    }

    static restoreFromMobile(mnemonic) {
        const seedHex = bip39.mnemonicToSeedHex(mnemonic)
        const hdNode = qtum.HDNode.fromSeedHex(seedHex, network)
        const account = hdNode.deriveHardened(88).deriveHardened(0)
        const walletList = []
        for (let i = 0; i < 10; i++) {
            const wallet = new Wallet(account.deriveHardened(i).keyPair)
            wallet.setInfo()
            walletList[i] = {
                wallet,
                path: i
            }
        }
        return walletList
    }

    static restoreFromWif(wif) {
        return new Wallet(qtum.ECPair.fromWIF(wif, network))
    }

    static async restoreHdNodeFromLedgerPath(ledger, path) {
        const res = await ledger.qtum.getWalletPublicKey(path)
        const compressed = ledger.qtum.compressPublicKey(
            Buffer.from(res['publicKey'], 'hex')
        )
        const keyPair = new qtum.ECPair.fromPublicKeyBuffer(compressed, network)
        const hdNode = new qtum.HDNode(
            keyPair,
            Buffer.from(res['chainCode'], 'hex')
        )
        hdNode.extend = {
            ledger: {
                ledger,
                path
            }
        }
        return hdNode
    }

    static restoreFromHdNodeByPage(hdNode, start, length = 10) {
        const walletList = []
        const extend = hdNode.extend
        for (let i = start; i < length + start; i++) {
            const wallet = new Wallet(hdNode.derive(i).keyPair, extend)
            wallet.setInfo()
            walletList[i] = {
                wallet,
                path: i
            }
        }
        return walletList
    }

    static generateMnemonic() {
        return bip39.generateMnemonic()
    }

    static async connectLedger() {
        return await ledger.connect()
    }

    static getLedgerDefaultPath() {
        return ledger.defaultPath
    }

    static changeUnitFromSatTo1(amountSat, pos = satPos) {
        const amountSatBig = new BigNumber(amountSat)
        return amountSatBig.div(Math.pow(10, pos)).toFormat()
    }

    static changeUnitFrom1ToSat(amount1, pos = satPos) {
        const amountBig = new BigNumber(amount1)
        return amountBig.times(Math.pow(10, pos)).toString()
    }
}
