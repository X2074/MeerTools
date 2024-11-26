import { simulateContract, writeContract, getPublicClient, getAccount } from '@wagmi/core'
import { config } from '../wagmi'
import { changeChain } from '@/utils/wallet'
import Web3 from "web3"
// 实例化 dimai 合约
import dimaiNFTContractFile from './contractFiles/DimaiNFT.json'
// 实例化 DimAI用户合集 合约
import myCollectionContract from './contractFiles/MyDimAICollection.json'
// NFT元数据地址记录合约
import mintedNFTContractFile from './contractFiles/DimAIMintedNFT.json'
import { DEFAULT_CHAINID } from '@/api/constant'

import { ethers } from 'ethers';
/**
 * 获取mintNFT合约
 */
export const getDimaiMintedNFTContract = async () => {
    // 使用ethers生成ether合约实例，用来处理viem实例不易处理的问题
    const providerEth = new ethers.providers.Web3Provider(window.ethereum);
    const contractEth = new ethers.Contract(mintedNFTContractFile.proxy, mintedNFTContractFile.abi, providerEth);
    return contractEth
}
// 获取当前选中数据是否有已经mint过的
export const getMintedNFTS = async (data) => {
    const contract = await getDimaiMintedNFTContract()
    const NFTStatus = []
    const promises = [];
    data.forEach(item => {
        const promises1 = contract.verifyIfMinted(item).then(res => {
            NFTStatus.push(res)
        })
        promises.push(promises1);
    })
    await Promise.all(promises); // 等待所有并发请求完成
    return NFTStatus;
}
/**
 * 获取dimaiNFT合约
 */
export const getDimaiCollectionContract = async (address) => {
    // 判断当前的chainID
    const account = getAccount(config)
    if (account.chainId != DEFAULT_CHAINID) {
        await changeChain(DEFAULT_CHAINID)
    }
    let addressEth = address ? address : dimaiNFTContractFile.proxy;
    let abi = address ? myCollectionContract.abi : dimaiNFTContractFile.abi;
    // 使用ethers生成ether合约实例，用来处理viem实例不易处理的问题
    const providerEth = new ethers.providers.Web3Provider(window.ethereum);
    const contractEth = new ethers.Contract(addressEth, abi, providerEth);
    return contractEth
}
/**
 * 使用diami铸造NFT
 * @param data NFT元数据获取链接（上传到s3数据库的话就是返回值res.Location）
 */
export const payToMintWithoutDIM = async (data) => {
    const contract = await getDimaiCollectionContract()
    let provider = getPublicClient(config);
    const gasPrice = await provider.getGasPrice();
    const account = getAccount(config)
    try {
        const { request } = await simulateContract(config, {
            address: contract.address,
            abi: dimaiNFTContractFile.abi,
            functionName: 'freeMint',
            args: [data.nft_meta, data.nft_sign],
            from: account.address,
            gasLimit: 500000 * data.nft_meta.length,
            gasPrice: gasPrice
        })
        const hash = await writeContract(config, request)
        return hash
    } catch (err) {
        console.log(err, 'err');
        return err
    }
}
/**
 * 获取用户拥有的NFT数量
 */
export const getNFTBalance = async (address) => {
    let contract = null;
    contract = await getDimaiCollectionContract(address);
    const account = getAccount(config)
    const balance = await contract.balanceOf(account.address).then(res => {
        return Web3.utils.hexToNumber(res)
    }).catch(err => {
        return 0
    })
    return balance
}
/**
 * 根据用户持有的nft内部索引获取用户持有的nft的tokenID
 * 有地址，说明需要调用工厂合约来查询
 */
export const getTokenIDByIndex = async (index, address) => {
    let contract = null;
    contract = await getDimaiCollectionContract(address)
    const account = getAccount(config)
    return await contract.tokenOfOwnerByIndex(account.address, index).then(tokenID => {
        return Web3.utils.hexToNumber(tokenID)
    }).catch(err => {
        return -1
    })
}
/**
 * 根据tokenID查询tokenURI
 */
export const getTokenURIByTokenID = async (tokenID, address) => {
    let contract = null;
    contract = await getDimaiCollectionContract(address)
    return await contract.tokenURI(tokenID).then(tokenURI => {
        return tokenURI
    }).catch(err => {
        return -1
    })
}