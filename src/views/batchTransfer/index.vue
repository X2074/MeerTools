<style scoped lang="scss">
@import "./index.scss";
</style>
<template src="./index.html"></template>
<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
import { getMultiTransferAddress } from "@/utils/contractAddressHelper";
import useClipboard from "vue-clipboard3";
const { toClipboard } = useClipboard();
import { useConnect, useAccount, useDisconnect } from "@wagmi/vue";
import { useBalance } from "@/hooks/useTransfer";
import defaultTokenList from "@/config/tokens/index";
import { NATIVE } from "@/config/constants/native";
import {
    simulateContract,
    writeContract,
    getPublicClient,
    getAccount,
} from "@wagmi/core";
import Transfer_ABI from "@/config/abi/MutilTransfer.json";
import { config } from "@/wagmi";
import { ethers } from "ethers";
let tokenList = ref([]);
// 获取登录信息模块
const { address, chainId, status } = useAccount();
let addressList = [
    "0x0Ea7f00E94dF1D85CA2A09056b555FDA7c029CbC",
    "0x6495f506Dbf71c3C46e451E3DF99F674396d83A8",
];
let sendValue = 1;
let token = {
    address: "0xa03650818CC5162F823e72d6902A9176d8A707B0",
    chainId: 8131,
    decimals: 18,
    logoURI: "",
    name: "DimAI",
    symbol: "DIM",
};

let data = {
    addressList: ["0xAd9913194870d96905781C610c94b87d95594027", ""],
};
/**
 * 获取token合约
 */
const getTokenContract = async () => {
    const account = getAccount(config);
    // 使用ethers生成ether合约实例，用来处理viem实例不易处理的问题
    const providerEth = new ethers.providers.Web3Provider(window.ethereum);
    const tokenContract = new ethers.Contract(
        token.address,
        Transfer_ABI,
        providerEth
    );
    console.log(tokenContract, "是否获取合约");
    return tokenContract;
};
onMounted(async () => {
    let contract = await getTokenContract();
    const account = getAccount(config);
    let provider = getPublicClient(config);
    let gasPrice = await provider.getGasPrice();
    console.log(contract, "provider");
    getTokenList();
    return;
    try {
        // 先模拟合同写入
        const { request } = await simulateContract(config, {
            address: "0x4c4d6981c043c76c26413D761a217c95289353F1",
            abi: Transfer_ABI,
            functionName: "transferETH",
            args: [addressList, "1000000000000000000"],
            // overrides: {
            value: "2000000000000000000",
            from: account.address,
            gasLimit: 300000,
            gasPrice: gasPrice,
            // }
        });
        const hash = await writeContract(config, request);
        return hash;
    } catch (err) {
        console.log(err, "绘图部分的错误");
        return err;
    }
});

const copy = async (Msg: any) => {
    if (status != "connected") return;
    try {
        //复制
        await toClipboard(Msg);
        bus.emit("promptModalSuccess", i18n.global.t("personal.copySuccess"));
    } catch (e) {
        //复制失败
        bus.emit("promptModalErr", i18n.global.t("personal.copyFail"));
    }
};

const getTokenList = () => {
    let _tokenList = [...defaultTokenList[chainId.value]];
    _tokenList.sort((t1, t2) => {
        return t1.symbol.toLowerCase() < t2.symbol.toLowerCase() ? -1 : 1;
    });
    console.log(_tokenList, "_tokenList01");
    _tokenList = [NATIVE[chainId.value], ..._tokenList];
    _tokenList.forEach((item) => {
        item["value"] = item.name;
    });
    tokenList.value = _tokenList;
    console.log(_tokenList, "_tokenList");
};
</script>