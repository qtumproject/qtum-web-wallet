/**
 * 1. 引入对应的nft合约的abi
 * 2. 调用钱包的call逻辑
 * 3. 调用对应的合约接口
 */
import webWallet from '@/libs/web-wallet'
import { nftAbiMap, getNFTContractAddress } from '@/libs/nodes/nftInfo'
import abi from 'ethjs-abi'
import qtum from 'qtumjs-lib'
import { ethers } from 'ethers'

class NFTService {

    encodeMethod(nftAbi, params) {
        const encodeData = abi.encodeMethod(nftAbi, params).substring(2)
        return encodeData
    }

    decodeData(data, nftAbi) {
        const res = ethers.utils.defaultAbiCoder.decode(nftAbi, data)
        return res
    }

    /**
     * @description 创建NFT
     */
    async createNFT(owner, name, url, desc, count, gasPrice, gasLimit, fee) {
        const encodeMethod = nftAbiMap['createNFT']
        const hexAddress = qtum.address
            .fromBase58Check(owner)
            .hash.toString('hex')
        const encodeData = this.encodeMethod(encodeMethod, [`0x${hexAddress}`, name, url, desc, count])
        const wallet = webWallet.getWallet()
        const rawTx = await wallet.generateSendToContractTx(getNFTContractAddress(), encodeData, gasLimit, gasPrice, fee)
        const res = await wallet.sendRawTx(rawTx)
        return res
    }

    /**
     * @description 获取当前钱包的NFT列表，支持分页
     */
    async getNFTListByOwner(owner, fromIndex, count) {
        const encodeMethod = nftAbiMap['getNFTListByOwner']
        const hexAddress = qtum.address
            .fromBase58Check(owner)
            .hash.toString('hex')
        const encodeData = this.encodeMethod(encodeMethod, [`0x${hexAddress}`, fromIndex, count])
        const res = await webWallet.getWallet().callContract(getNFTContractAddress(), encodeData)
        if (res) {
            const data = this.decodeData(`0x${res}`, encodeMethod.outputs)
            const ids = Array.from(new Set(data[0].filter((id) => id).map((id) => id.toString())))
            const infos = await this.batchNFTInfoByIds(owner, ids)
            const NFTList = infos.map((info, index) => {
                return {...info, tokenId: ids[index] }
            })
            return [NFTList, data[1].toString()]
        } else {
            throw new Error('getNFTListByOwner check res value is null')
        }
    }

    async batchNFTInfoByIds(owner, ids) {
        const encodeMethod = nftAbiMap['batchNFTInfoByIds']
        const hexAddress = qtum.address
            .fromBase58Check(owner)
            .hash.toString('hex')
        const encodeData = this.encodeMethod(encodeMethod, [`0x${hexAddress}`, ids])
        const res = await webWallet.getWallet().callContract(getNFTContractAddress(), encodeData)
        if (res) {
            const data = this.decodeData(`0x${res}`, encodeMethod.outputs)
            return data[0]
        } else {
            throw new Error('batchNFTInfoByIds check res value is null')
        }
    }

    /**
     * @description transfer NFT
     */
    async safeTransferFrom(from, to, tokenId, count) {
        const encodeMethod = nftAbiMap['safeTransferFrom']
        const fromHexAddress = qtum.address
            .fromBase58Check(from)
            .hash.toString('hex')
        const toHexAddress = qtum.address
            .fromBase58Check(to)
            .hash.toString('hex')
        const encodeData = this.encodeMethod(encodeMethod, [`0x${fromHexAddress}`, `0x${toHexAddress}`, tokenId, count])
        const wallet = webWallet.getWallet()
        const rawTx = await wallet.generateSendToContractTx(getNFTContractAddress(), encodeData, '2500000', '40', '0.01')
        const res = await wallet.sendRawTx(rawTx)

        return res
    }
}

export const nftService = new NFTService()
