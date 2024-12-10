import { getBalance, simulateContract, writeContract, getWalletClient, getPublicClient, getAccount, waitForTransactionReceipt } from '@wagmi/core'
import Web3 from "web3"
import store from '@/store'

import { QngTestnet } from '@/api/constant'
import { config } from '../wagmi'
import { ethers } from 'ethers';
export const payToDrawPrompt = async (data) => {
    const balance = await getBalanceDim()
    if (balance < data.amount) {
        return -1
    }
    const contract = await getDimaiContract()
    const tokenContract = await getTokenContract()
    // 获取gas
    const provider = getPublicClient(config)
    const gasPrice = await provider.getGasPrice();
    const payAmount = Web3.utils.toWei(Web3.utils.toBN(data.amount).toString(), "ether");
    const account = getAccount(config)
    // 授权给合约，允许合约使用账户 token
    const currentAllowance = await tokenContract.allowance(account.address, contract.address);
    return;
    let hash;
    if (parseInt(Web3.utils.fromWei(Web3.utils.toBN(currentAllowance).toString(), "ether")) < parseInt(Web3.utils.fromWei(Web3.utils.toBN(payAmount).toString(), "ether"))) {
        // 如果当前授权数量小于转账数量，则先进行授权
        try {
            // 先模拟合同写入
            const { request } = await simulateContract(config, {
                address: tokenContract.address,
                abi: ERC20ABI,
                functionName: 'approve',
                // 
                args: [contract.address, payAmount],
                // overrides: {
                gasLimit: 300000,
                gasPrice: gasPrice
            })
            hash = await writeContract(config, request)
        } catch (err) {
            return err
        }
        try {
            const receipt = await waitForTransactionReceipt(config, { hash: hash });
            console.log(receipt, 'receipt');
        } catch (err) {
            return err;
        }
    }

}