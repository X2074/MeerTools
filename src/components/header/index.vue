<template src="./index.html"></template>
<script lang="ts" setup>
import { ref, onMounted, reactive, watch } from "vue";
// 引入钱包链接模块
import { useConnect, useAccount, useDisconnect } from "@wagmi/vue";
import { waitForWaltConnect } from "@/utils";
import chains from "@/config/constants/chains.json";
import { useRouter } from "vue-router";
import { watchAccount } from "@wagmi/core";
import { config } from "@/wagmi";
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
import { changeChain } from "@/utils/wallet";
// 退出登录
const { disconnect } = useDisconnect();
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
    { name: "Block Explorer", path: "https://qng.qitmeer.io/" },
    // {
    //     name: "Block Explorer",
    //     child: [
    //         {
    //             name: "xx",
    //             path: "",
    //         },
    //     ],
    // },
    { name: "qitmeer", path: "https://qitmeer.io/" },
];
// 下拉列表的网络
let chainsData = reactive([]);
// 预设选中的网络
let chainIdCheck = ref(8131);
const goPath = (path) => {
    if (!path) return;
    if (path.startsWith("http")) {
        window.open(path);
    } else {
        router.push(path);
    }
}; // 监听账户切换操作
watchAccount(config, {
    onChange(res) {
        if (res.isConnected) {
            console.log(res, "resresresresres");
            // 过滤，看是否是预设的网络
            let changeChainId = chainsData.filter((item) => {
                if (item.id === res.chainId) return item;
            });
            // 如果不是，就切换为预设网络
            if (!changeChainId || !changeChainId.length) {
                changeChain(chainIdCheck.value);
            }
        } else {
            // 第一次获取的状态是false，此处需要做特殊处理，判断是否真的未登录状态
            // if (store.getters.token !== '') {
            // store.dispatch('user/logout')
            // }
        }
    },
});
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
            confirmLoading.value = false;
        });
    }
    loginWallt.value = false;
    // 调用连接函数进行登录
    connect(data);
};

onMounted(async () => {
    console.log(chains, "chains");
    chainsData = [
        chains["QngMainnet"],
        chains["QngTestnet"],
        chains["AmanaTestnet"],
    ];
    console.log(chainsData, "chainsData");
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
            // 过滤，看是否是预设的网络
            let changeChainId = chainsData.filter((item) => {
                if (item.id === chainId.value) return item;
            });
            // 如果不是，就切换为预设网络
            if (!changeChainId || !changeChainId.length) {
                changeChain(chainIdCheck.value);
            } else {
                chainIdCheck.value = chainId.value;
            }
        } else {
            isLogin.value = false;
        }
    }
);

const changeChainId = () => {
    console.log(chainIdCheck.value, "chainIdCheck.value");
    changeChain(chainIdCheck.value);
};

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