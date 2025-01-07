<template src="./index.html"></template>
<script lang="ts" setup>
import { ref, onMounted, reactive, watch } from "vue";
// 引入钱包链接模块
import { useConnect, useAccount, useDisconnect } from "@wagmi/vue";
import { config } from "@/wagmi";
import { changeChain } from "@/utils/wallet";
import { waitForWaltConnect } from "@/utils";
import { DEFAULT_CHAINID } from "@/api/constant";
import { useRouter } from "vue-router";
import store from "@/store";
import bus from "@/utils/bus.js";

import Web3 from "web3";
const router = useRouter();
// 钱包选项
let loginWallt = ref(false);
// 是否链接
const isLogin = ref(false);
const avatar = ref(null);

let confirmLoading = ref(false);

// 唤起钱包模块
const { connect, connectors, error } = useConnect();
// 获取登录信息模块
const { address, chainId, status } = useAccount();
// 退出登录
const { disconnect } = useDisconnect();
const account = useAccount();
/* <p>水龙头</p>
<p>批量转账</p>
<p>智能合约自动部署</p>
<p>供应量查询</p>
<p>生态项目监管</p> */
const menus = [
    {
        name: "Tool module",
        child: [
            {
                name: "Faucet",
                path: "/faucet",
            },
            {
                name: "Batch Transfer",
                path: "/batchTransfer",
            },
            {
                name: "Smart Contract Auto Deployment",
                path: "/contractDeployment",
            },
            {
                name: "Supply Query",
                path: "/supplyQuery",
            },
            {
                name: "Ecological Project Review",
                path: "",
            },
        ],
    },
    { name: "Block Explorer", path: "" },
    {
        name: "Block Explorer",
        child: [
            {
                name: "xx",
                path: "",
            },
        ],
    },
    { name: "qitmeer", path: "https://qitmeer.io/" },
];
const goPath = (path) => {
    console.log(111);
    if (!path) return;
    if (path.startsWith("http")) {
        window.open(path);
    } else {
        router.push(path);
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

onMounted(async () => {
    if (status.value == "connected") {
        isLogin.value = true;
    }
});
// 监听登录状态变化
watch(
    () => status.value,
    async (newV) => {
        if (newV == "connected") {
            isLogin.value = true;
        } else {
            isLogin.value = false;
        }
    }
);

//省略地址中间内容
const omit = (address: any, len: any) => {
    if (!len) len = 8;
    if (address !== undefined) {
        const newAddress =
            address.substring(0, len) +
            "..." +
            address.substring(address.length - len, address.length);
        return newAddress;
    } else {
        return address;
    }
};
// 监听登录状态变化
watch(
    () => status.value,
    async (newV) => {
        console.log(newV, address.value, "address");

        if (newV == "connected") {
        }
    }
);
</script>
<style scoped lang="scss">
@import "./index.scss";
</style>