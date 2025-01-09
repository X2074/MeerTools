<style scoped lang="scss">
@import "./index.scss";
</style>
<template src="./index.html"></template>
<script lang="ts" setup>
import { ref, onMounted, watch, toRaw } from "vue";
import { QITMEER_HASH } from "@/api/constant";
import useClipboard from "vue-clipboard3";
const { toClipboard } = useClipboard();
import { useConnect, useAccount, useDisconnect } from "@wagmi/vue";
import defaultTokenList from "@/config/tokens/index";
import Web3 from "web3";
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
    getBalance,
    waitForTransactionReceipt,
} from "@wagmi/core";
import Transfer_ABI from "@/config/abi/Transfer.json";
import erc20 from "@/config/abi/erc20.json";
import { config } from "@/wagmi";
import { ethers } from "ethers";

let sendHash = ref("");
let walltAddress = ref(""); //选择的钱包地址
let walltAddressOld = ref(""); //选择的旧的钱包地址
let tokenList = ref([]);
let lookHash = ref(false);
let sendData = ref();
// 获取登录信息模块
const { address, chainId, status } = useAccount();
// 唤起钱包模块
const { connect, connectors, error } = useConnect();
let confirmLoading = ref(true);
// 收款人列表
let allEvents = ref([]);
// 钱包选项
let loginWallt = ref(false);
// 要转账的地址数组
let addressList = ref([]);
// 每个账户转账数量的数组
let tokenAmountList = ref([]);
let sendValue = 1;
let confirmation = ref(false);
// 交易的时候提前保留的数据
let sendContent = ref({});

/**
 * 获取token合约
 */
const getTokenContract = async (address, abi) => {
    const account = getAccount(config);
    // 使用ethers生成ether合约实例，用来处理viem实例不易处理的问题
    const providerEth = new ethers.providers.Web3Provider(window.ethereum);
    const tokenContract = new ethers.Contract(address, abi, providerEth);
    console.log(tokenContract, "是否获取合约");
    return tokenContract;
};
onMounted(async () => {
    confirmLoading.value = false;
});
watch(
    () => status.value,
    async (newV) => {
        console.log(newV, address.value, "address");
        if (newV == "disconnected") {
            loginWallt.value = true;
        }
        if (newV == "connected") {
            getTokenList();
        }
    },
    { immediate: true }
);

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
// 确认地址-交易
const confirmAddress = () => {
    if (!allEvents.value || !allEvents.value.length) {
        bus.emit("promptModalErr", "Please Add Receiving Information !");
        return;
    }
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
        bus.emit("promptModalErr", "Invalid Receiving Address !");
        return;
    }
    if (dataAmount && dataAmount.length) {
        bus.emit("promptModalErr", "Invalid Transfer Amount !");
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
        bus.emit("promptModalSuccess", " Copy Successful !");
    } catch (e) {
        // Copy Failed
        bus.emit("promptModalErr", " Copy Failed !");
    }
};
// 获取所有的币种
const getTokenList = () => {
    console.log(chainId.value, "chainId.value");

    let _tokenList = [...defaultTokenList[chainId.value]];

    _tokenList.sort((t1, t2) => {
        return t1.symbol.toLowerCase() < t2.symbol.toLowerCase() ? -1 : 1;
    });
    _tokenList = [NATIVE[chainId.value], ..._tokenList];
    _tokenList.forEach((item) => {
        item["value"] = item.symbol + " " + item.address;
    });
    tokenList.value = _tokenList;
};
// 交易
const sendTransfer = async () => {
    confirmLoading.value = true;
    let token: any = null;
    token = tokenList.value.filter((item) => {
        if (item.address == walltAddress.value) {
            return item;
        }
    })[0];
    token = { ...token };

    // 获取批量交易合约实例
    let contract = await getTokenContract(
        Transfer_ABI.address,
        Transfer_ABI.abi
    );
    let [fee, balance, balanceWallt] = ["", "", null];
    // 获取币种实例
    if (token.address) {
        let contract20 = await getTokenContract(token.address, erc20);
        try {
            balance = await contract20.balanceOf(address.value);
        } catch (error) {
            console.log(error, "error");
        }
    }

    let account = getAccount(config);
    let provider = getPublicClient(config);
    let gasPrice = await provider.getGasPrice();
    try {
        fee = await contract.fee();
    } catch (error) {
        console.log(error, "error");
    }
    let allAmount = tokenAmountList.value.reduce((total, currentValue) => {
        return accAdd(total, parseAmount(currentValue + "", token.decimals));
    }, "0");
    balanceWallt = await getBalance(config, {
        address: address.value,
    });

    sendData.value = {
        gasPrice: Web3.utils.fromWei(gasPrice.toString() + "", "ether"),
        gasLimit: "21000",
        value: "0",
        to: contract.address,
        network: account["chain"]["network"],
        fee: fee.toString(),
        allAmount: Web3.utils.fromWei(allAmount + "", "ether"),
        name: token["name"],
        symbol: token["symbol"],
        balance: balance
            ? Web3.utils.fromWei(balance.toString() + "", "ether")
            : (balanceWallt["formatted"] * 1).toFixed(2),
        formatted: (balanceWallt["formatted"] * 1).toFixed(2),
        symbolWallt: balanceWallt["symbol"],
    };
    confirmLoading.value = false;
    confirmation.value = true;
    // 如果是eth类型就不需要传token address
    console.log(isEth(token, chainId.value), "isEth(token, chainId.value)");
    sendContent.value = { account, gasPrice, token };
};

const ethSend = async (account, gasPrice, token) => {
    confirmLoading.value = true;
    let contract = await getTokenContract(
        Transfer_ABI.address,
        Transfer_ABI.abi
    );
    let fee = await contract.fee();
    let allAmount = tokenAmountList.value.reduce((total, currentValue) => {
        return accAdd(total, parseAmount(currentValue + "", token.decimals));
    }, "0");
    let tokenAmount = tokenAmountList.value.map((item) =>
        parseAmount(item + "", token.decimals).toString()
    );
    if (
        !sendData.value["balance"] ||
        parseAmount(sendData.value["balance"] + "", token.decimals) < allAmount
    ) {
        bus.emit("promptModalErr", "Insufficient Balance !");
        confirmLoading.value = false;
        return;
    }

    try {
        // 先模拟合同写入
        const { request } = await simulateContract(config, {
            address: Transfer_ABI.address,
            abi: Transfer_ABI.abi,
            functionName: "transferMultiETH",
            args: [toRaw(addressList.value), tokenAmount],
            value: accAdd(allAmount, fee.toString()),
            from: account.address,
            gasLimit: 300000,
            gasPrice: gasPrice,
        });
        const hash = await writeContract(config, request);
        const receipt = await waitForTransactionReceipt(config, { hash: hash });
        sendHash.value = hash;
        confirmLoading.value = false;
        lookHash.value = true;
        return hash;
    } catch (err) {
        console.log(err, "错误");
        return err;
    }
};
const tokenSend = async (account, gasPrice, token) => {
    confirmLoading.value = true;
    let contract = await getTokenContract(
        Transfer_ABI.address,
        Transfer_ABI.abi
    );
    let fee = await contract.fee();
    const tokenAmount = allEvents.value.map((item) =>
        parseAmount(item.amount + "", token.decimals).toString()
    );
    let allTokenAmount = 0;
    tokenAmount.forEach((item) => {
        allTokenAmount = allTokenAmount + Number(item);
    });
    if (
        !sendData.value["balance"] ||
        parseAmount(sendData.value["balance"] + "", token.decimals) <
            allTokenAmount
    ) {
        confirmLoading.value = false;
        bus.emit("promptModalErr", "Insufficient Balance !");
        return;
    }

    const providerEth = new ethers.providers.Web3Provider(window.ethereum);
    const tokenContract = new ethers.Contract(
        token.address,
        erc20,
        providerEth
    );
    // 授权给合约，允许合约使用账户 token
    let currentAllowance = await tokenContract.allowance(
        account.address,
        contract.address
    );
    currentAllowance = currentAllowance.toString();

    if (!currentAllowance || allTokenAmount > currentAllowance) {
        await isApprove(account, token, allTokenAmount);
    }
    // 需要把addressList.value改为toRaw格式
    try {
        // 先模拟合同写入
        const { request } = await simulateContract(config, {
            address: Transfer_ABI.address,
            abi: Transfer_ABI.abi,
            functionName: "transferMultiToken",
            args: [token.address, toRaw(addressList.value), tokenAmount],
            value: fee.toString(),
            from: account.address,
            gasLimit: 300000,
            gasPrice: gasPrice,
        });
        const hash = await writeContract(config, request);
        const receipt = await waitForTransactionReceipt(config, { hash: hash });
        sendHash.value = hash;
        confirmLoading.value = false;
        lookHash.value = true;
        return hash;
    } catch (err) {
        console.log(err, "错误");
        return err;
    }
};
// 授权
const isApprove = async (account, token, allTokenAmount) => {
    confirmLoading.value = true;
    // 如果当前授权数量小于转账数量，则先进行授权
    let hash;
    try {
        // 先模拟合同写入
        const { request } = await simulateContract(config, {
            address: token.address,
            abi: erc20,
            functionName: "approve",
            args: [account.address, allTokenAmount * 1],
            gasLimit: 300000,
            gasPrice: 10000000000,
        });
        hash = await writeContract(config, request);
        const receipt = await waitForTransactionReceipt(config, { hash: hash });
        confirmLoading.value = false;
        console.log(hash, "hash");
    } catch (err) {
        console.log(err, "授权部分的错误");
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

const getTokenListSearch = async (val) => {
    console.log(val, "val");
    // 正则表达式用于匹配以太坊地址
    const regexA = /^0x[a-fA-F0-9]{40}$/;
    if (regexA.test(val)) {
        try {
            let contract = await getTokenContract(val, erc20);
            console.log(contract, "contract");

            let data = {};
            if (contract) {
                data["name"] = await contract.name();
                data["symbol"] = await contract.symbol();
                data["address"] = await contract.address;
                let decimals = await contract.decimals();
                data["decimals"] = decimals.toString();
                data["value"] = data["symbol"] + " " + data["address"];
                console.log(data, "data");
                tokenList.value.push(data);
                // walltAddress.value = data["value"];
            }
        } catch (error) {
            console.log(error, "error");
        }
    }
};

const confirmSend = () => {
    confirmation.value = false;
    console.log(toRaw(sendContent.value), "sendContent.value");
    let data = toRaw(sendContent.value);
    if (isEth(data["token"], chainId.value)) {
        ethSend(data["account"], data["gasPrice"], data["token"]);
    } else {
        tokenSend(data["account"], data["gasPrice"], data["token"]);
    }
};

const confirmHash = () => {
    lookHash.value = false;
    window.open(QITMEER_HASH + sendHash.value);
};
</script>