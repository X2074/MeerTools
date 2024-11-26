import { getBalance, simulateContract, writeContract, getPublicClient, getAccount } from '@wagmi/core'
import { changeChain } from '@/utils/wallet'
import { DEFAULT_CHAINID } from '@/api/constant'
import bus from '@/utils/bus.js'
import Web3 from "web3"
import store from '@/store'
import contractFile from './contractFiles/DimaiCollectionFactory.json'
import { config } from '../wagmi'
import { ethers } from 'ethers';
const contractAddress = contractFile.factoryAddr;
const abi = contractFile.abi;

/**
 * 获取工厂合约
 */
export const getCollectionFactoryContract = async () => {
    const account = getAccount(config)
    if (account.chainId != DEFAULT_CHAINID) {
        await changeChain(DEFAULT_CHAINID)
    }
    // 使用ethers生成ether合约实例，用来处理viem实例不易处理的问题
    const providerEth = new ethers.providers.Web3Provider(window.ethereum);
    const contractEth = new ethers.Contract(contractAddress, abi, providerEth);
    return contractEth
}
/**
 * 创建（为订单支付token）
 * @param name 名称
 * @param symbol 合集的符号
 * royaltyReceiver 版税收取地址 版税收取地址设定为从钱包获取到的当前连接地址
 * royaltyFraction 版税收取比例，比例先设为0
 * payType 合集收取费用的类型 值只可以是两个："meer" 和 "token"， 暂时默认使用MEER
 *
 */
export const createCollection = async (name, symbol) => {
    const account = getAccount(config)
    const royaltyReceiver = account.address;
    const royaltyFraction = '0';
    const payType = 'meer';
    const contract = await getCollectionFactoryContract();
    const provider = getPublicClient(config)
    const gasPrice = await provider.getGasPrice();
    const currentFee = await contract.currentFee()
    contract.off('CollectionCreated')
    // 监听合集创建事件，有返回合集地址就将地址传给上级页面
    contract.on('CollectionCreated', (creator, collectionAddress, nameCollection, symbolCollection) => {
        // 如果创建的地址和当前用户地址一样，且合集名称，符号也是一样的，那么就认为这个合集就是当前用户创建的合集，可以保存于接口
        if (creator === account.address && nameCollection === name && symbol === symbolCollection) {
            bus.emit("collectionAddress", collectionAddress)
        }
    });
    try {
        const { request } = await simulateContract(config, {
            address: contract.address,
            abi: abi,
            functionName: "createCollection",
            args: [name, symbol, royaltyReceiver, royaltyFraction, payType],
            // overrides: {
            from: account.address,
            value: currentFee[0],
            gasLimit: 3000000,
            gasPrice: gasPrice
            // }
        })
        const hash = await writeContract(config, request)
        return hash
    } catch (err) {
        return err
    }
}
/**
 * 获取当前用户合集
 */
export const getCollection = async () => {
    const account = getAccount(config)
    const contract = await getCollectionFactoryContract();
    try {
        let receipt = await contract.getUserCollections(account.address)
        return receipt
    } catch (err) {
        return err
    }
}

/**
 * 检查钱包是否够支付
  */
export const getGasFnFree = async () => {
    let userInfo = store.getters.userInfo;
    const provider = getPublicClient(config)
    const contract = await getCollectionFactoryContract();
    const currentFee = await contract.currentFee()
    let gasPrice = await provider.getGasPrice();
    let gasNum = Web3.utils.fromWei(gasPrice + '', "ether");
    // 获取账户余额
    const balance = await getBalance(config, {
        address: userInfo.address
    });
    gasNum = gasNum * 1 * 300000;//最大gas费用

    const payAmount = Web3.utils.fromWei(Web3.utils.toBN(currentFee['0']._hex).toString(), "ether");//创建合集需要的费用
    if (balance.formatted < (gasNum + payAmount)) {
        return false;//不够支付gas 和创建费
    } else {
        return true;

    }
}
