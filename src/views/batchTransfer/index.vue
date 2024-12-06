<style scoped lang="scss">
@import "./index.scss";
</style>
<template src="./index.html"></template>
<script lang="ts" setup>
import { ref, onMounted, watch, toRaw } from "vue";
import useClipboard from "vue-clipboard3";
const { toClipboard } = useClipboard();
import { useConnect, useAccount, useDisconnect } from "@wagmi/vue";
import defaultTokenList from "@/config/tokens/index";
import {
    accAdd,
    accMul,
    formatAmount,
    formatBalance,
    parseAmount,
} from "@/utils/format";
import { waitForWaltConnect } from "@/utils";
import { NATIVE } from "@/config/constants/native";
import bus from "@/utils/bus.js";
import { isEth } from "@/utils/isEth";
import {
    simulateContract,
    writeContract,
    getPublicClient,
    getAccount,
} from "@wagmi/core";
import Transfer_ABI from "@/config/abi/MutilTransfer.json";
import { config } from "@/wagmi";
import { ethers } from "ethers";
let walltAddress = ref(""); //选择的钱包地址
let tokenList = ref([]);
// 获取登录信息模块
const { address, chainId, status } = useAccount();
// 唤起钱包模块
const { connect, connectors, error } = useConnect();
let confirmLoading = ref(false);
// 收款人列表
let allEvents = ref([]);
// 钱包选项
let loginWallt = ref(false);
// let addressList = [
//     "0x0Ea7f00E94dF1D85CA2A09056b555FDA7c029CbC",
//     "0x6495f506Dbf71c3C46e451E3DF99F674396d83A8",
// ];
// 要转账的地址数组
let addressList = ref([]);
// 每个账户转账数量的数组
let tokenAmountList = ref([]);
let sendValue = 1;
// let token = {
//     address: "0xa03650818CC5162F823e72d6902A9176d8A707B0",
//     chainId: 8131,
//     decimals: 18,
//     logoURI: "",
//     name: "DimAI",
//     symbol: "DIM",
// };

// let data = {
//     addressList: ["0xAd9913194870d96905781C610c94b87d95594027", ""],
// };
/**
 * 获取token合约
 */
const getTokenContract = async () => {
    let token = tokenList.value.filter((item) => {
        if (item.name == walltAddress.value) {
            return item;
        }
    })[0];
    token = { ...token };
    console.log(token, "token");
    const account = getAccount(config);
    // 使用ethers生成ether合约实例，用来处理viem实例不易处理的问题
    const providerEth = new ethers.providers.Web3Provider(window.ethereum);
    const tokenContract = new ethers.Contract(
        token["address"],
        Transfer_ABI,
        providerEth
    );
    console.log(tokenContract, "是否获取合约");
    return tokenContract;
};
onMounted(async () => {
    console.log(status.value, "status");
    getTokenList();
});
// 新增地址
const addAddress = () => {
    let data = {
        address: "",
        amount: 1,
    };
    allEvents.value.push(data);
};
// 删除地址
const deleteAddress = (index) => {
    allEvents.value.splice(index, 1); // 删除索引为 2 的元素
};
const confirmAddress = () => {
    let dataAddress = [];
    let dataAmount = [];
    // 正则表达式用于匹配以太坊地址
    const regexA = /^0x[a-fA-F0-9]{40}$/;
    // 正则表达式用于匹配数字（包括小数）但不允许科学计数法
    const regexN = /^\d+(\.\d+)?$/;
    allEvents.value.forEach((item, index) => {
        addressList.value.push(item.address);
        tokenAmountList.value.push(item.amount);
        if (!regexA.test(item["address"])) {
            dataAddress.push(item);
        }
        if (!regexN.test(item["amount"])) {
            dataAmount.push(item);
        }
    });
    if (dataAddress && dataAddress.length) {
        bus.emit("promptModalErr", "收款人地址有误");
        return;
    }
    if (dataAmount && dataAmount.length) {
        bus.emit("promptModalErr", "转账金额有误");
        return;
    }
    sendTransfer();
};
const copy = async (Msg: any) => {
    if (status.value != "connected") {
        loginWallt.value = true;
    }
    try {
        //复制
        await toClipboard(Msg);
        bus.emit("promptModalSuccess", "复制成功");
    } catch (e) {
        //复制失败
        bus.emit("promptModalErr", "复制失败");
    }
};
// 获取所有的币种
const getTokenList = () => {
    let _tokenList = [...defaultTokenList[chainId.value]];
    console.log(NATIVE[chainId.value], "_tokenList");

    _tokenList.sort((t1, t2) => {
        return t1.symbol.toLowerCase() < t2.symbol.toLowerCase() ? -1 : 1;
    });
    _tokenList = [NATIVE[chainId.value], ..._tokenList];
    _tokenList.forEach((item) => {
        item["value"] = item.name;
        item["label"] = item.name;
    });
    console.log(_tokenList, "_tokenList");

    tokenList.value = _tokenList;
};
// 交易
const sendTransfer = async () => {
    let token = tokenList.value.filter((item) => {
        if (item.name == walltAddress.value) {
            return item;
        }
    })[0];
    token = { ...token };
    let contract = await getTokenContract();
    const account = getAccount(config);
    let provider = getPublicClient(config);
    let gasPrice = await provider.getGasPrice();
    try {
        let fee = await contract.fee();
        console.log(fee, "fee");
    } catch (error) {
        console.log(error, "error");
    }

    if (isEth(token, chainId.value)) {
        ethSend(account, gasPrice, token);
    } else {
        tokenSend(account, gasPrice, token);
    }
    return;
};

const ethSend = async (account, gasPrice) => {
    let contract = await getTokenContract();
    let fee = await contract.fee();
    console.log(fee, "fee");

    let token = tokenList.value.filter((item) => {
        return item.name == walltAddress.value;
    })[0];
    console.log(tokenAmountList.value, "tokenAmountList");

    let allAmount = tokenAmountList.value.reduce((total, currentValue) => {
        return accAdd(total, parseAmount(currentValue + "", token.decimals));
    }, "0");
    let tokenAmount = tokenAmountList.value.map((item) =>
        parseAmount(item + "", token.decimals).toString()
    );

    console.log(accAdd(allAmount, fee.toString()), "allAmount");
    try {
        // 先模拟合同写入
        const { request } = await simulateContract(config, {
            address: token.address,
            abi: Transfer_ABI,
            functionName: "transferMultiETH",
            args: [toRaw(addressList.value), tokenAmount],
            value: accAdd(allAmount, fee.toString()),
            from: account.address,
            gasLimit: 300000,
            gasPrice: gasPrice,
        });
        const hash = await writeContract(config, request);
        return hash;
    } catch (err) {
        console.log(err, "绘图部分的错误");
        return err;
    }
};
const tokenSend = async (account, gasPrice) => {
    let contract = await getTokenContract();
    let fee = await contract.fee();
    try {
        // 先模拟合同写入
        const { request } = await simulateContract(config, {
            address: token.address,
            abi: Transfer_ABI,
            functionName: "transferMultiToken",
            args: [addressList.value, tokenAmountList.value],
            value: fee.toString(),
            from: account.address,
            gasLimit: 300000,
            gasPrice: gasPrice,
        });
        const hash = await writeContract(config, request);
        return hash;
    } catch (err) {
        console.log(err, "绘图部分的错误");
        return err;
    }
};

/**
 * 处理连接登录逻辑
 * @param {Object} data - 包含连接信息的对象
 */
const connectLogin = (data) => {
    // 检查数据中是否包含连接器信息，并判断连接器类型是否为钱包连接
    if (data.connector && data.connector["type"] == "walletConnect") {
        // 开始登录加载状态
        confirmLoading.value = true;
        waitForWaltConnect().then((isLoaded) => {
            if (isLoaded) {
                confirmLoading.value = false;
            } else {
                confirmLoading.value = false;
            }
        });
    }
    loginWallt.value = false;
    // 调用连接函数进行登录
    connect(data);
};

const lookDemo = () => {
    let data = {
        address: "0xAd9913194870d96905781C610c94b87d95594027",
        amount: 0.02,
    };
    allEvents.value.push(data);
};
// 限制输入数字
const onlyAllowNumbers = (event) => {
    const char = String.fromCharCode(event.which);
    if (!/[0-9]/.test(char)) {
        event.preventDefault(); // 阻止输入非数字字符
    }
};
</script>