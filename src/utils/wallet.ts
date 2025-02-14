
import { config } from '../wagmi'
import { ethers } from 'ethers';
import { switchChain } from '@wagmi/core'
import { DEFAULT_CHAINID } from '@/config/constants/constant'
export const changeChain = async (id) => {
    if (!window.ethereum) return;
    const providerEth = new ethers.providers.Web3Provider(window.ethereum);
    // 如果不是传入的id，那么就给切换
    let network = await providerEth.getNetwork();
    if (network.chainId != id) {
        try {
            await switchChain(config, { chainId: id })
            // location.reload()
        } catch (error) {
            console.log(error);
        }
    }
}
