import Web3 from 'web3';
import { RPC } from '@/api/constant';
import { config } from '@/wagmi'

import { getBlock } from '@wagmi/core'
//使用web3的rpc获取相关hash的相关数据
export const getRpcUrl = (url, hash, callback) => {
    const web3 = new Web3(url);
    if (!hash) {
        callback(web3)
    } else {
        web3.eth.getTransaction(hash).then((res) => {
            callback(res)
        })
    }
}
//web3初始化
export const getContract = (abi, contractAddress) => {
    const contract = new web3.eth.Contract(abi, contractAddress);
}

/**
 * 查询事件时间戳，格式化events
 * @param events
 */
export const formatEvents = async (events) => {
    const web3 = new Web3(RPC)
    const promises = []
    for (let i = 0; i < events.length; i++) {
        const event = events[i]
        const promise = getBlock(config, {
            blockNumber: event.blockNumber
        }).then((block) => {
            const timestamp = block.timestamp;
            return {
                timestamp: 1722089064,
                blockNumber: event.blockNumber,
                blockHash: event.blockHash,
                transactionHash: event.transactionHash,
                event: event.event,
                returnValues: event.args
            }
        })
        promises.push(promise)
    }
    return await Promise.all(promises)
}
