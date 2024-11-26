<template>
    <div v-if="isPc" v-route-loading="loading">
        <router-view />
    </div>

    <div class="model" v-else>
        <span class="info">
            <p>
                <span>亲爱的，我们暂时不支持移动端浏览请使用电脑浏览DimAI</span>
            </p>
        </span>
    </div>
    <!-- 授权确认弹框 -->
    <dialogModal
        v-model="authorizeBol"
        @close="closeAuthorize"
        @confirm="checkLogin"
        footer="whether"
    >
        <p class="mt-25 pl-25 pr-25">请检查你的钱包并授权签名，谢谢</p>
        <div class="html-text pl-25 pr-25" v-html="dimaiHtml"></div>
    </dialogModal>
    <!-- 切换钱包-确认弹框 -->
    <dialogModal
        v-model="handoffWalltBol"
        @close="closeHandoffWallt"
        @confirm="doConnect"
        footer="whether"
    >
        <p class="mt-25 pl-25 pr-25" v-html="'当前地址已退出，请重新登录'"></p>
    </dialogModal>
    <!-- 提示链接钱包 -->
    <dialogModal
        v-model="walletModal"
        footer="default"
        confirmText="连接钱包"
        @close="walletModal = false"
        @confirm="
            walletModal = false;
            doConnect();
        "
    >
        <p class="mt-25 pl-25 pr-25">请连接钱包后使用DimAI进行绘制</p>
    </dialogModal>
    <!-- 全局自动关闭提示 -->
    <prompt></prompt>
    <!-- 链接钱包 -->
    <dialogModal
        v-model="loginWallt"
        confirmText="连接钱包"
        @close="loginWallt = false"
    >
        <div
            class="connect-wallt pl-25 pr-25"
            v-for="connector in connectors"
            :key="connector.id"
            @click="connectLogin({ connector, chainId })"
        >
            {{ connector.name }}
        </div>
    </dialogModal>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted, nextTick } from "vue";
import store from "@/store";
import { cancleEvent } from "@/utils/window";
import { watchAccount } from "@wagmi/core";
import { config } from "@/wagmi";
import bus from "@/utils/bus.js";
import prompt from "@/components/prompt/index.vue";
import { waitForWaltConnect } from "@/utils";
import { isCheckTimeout } from "@/api/sys";
import { useRouter } from "vue-router";
import { useConnect, useAccount, useDisconnect } from "@wagmi/vue";
import { W3M_PROJECT_ID } from "@/api/constant";
const dimaiHtml =
    "<p>通过连接你的钱包并使用DimAI<br>表示你同意我们的</p><a class='a-first' href='/term' target='_blank'>用户条款</a><p>与</p><a class='a-end' href='/privacy' target='_blank'>隐私政策</a>";
// 唤起钱包模块
const { connect, connectors, error } = useConnect();
// 获取登录信息模块
const { address, chainId, status } = useAccount();
let loginWallt = ref(false);
let walletModal = ref(false); //链接钱包
let isLogin = ref(store.getters.token && store.getters.userInfo);
let router = useRouter();
let loading = ref(false);
let processDrawerBol = ref(false);
let isPc = ref(false);
let authorizeBol = ref(false);
let handoffWalltBol = ref(false); //切换钱包的提示
let homePageLoad = ref(false);
// 接收方
bus.on("homePageLoad", (res) => {
    loading.value = res;
});

onMounted(() => {
    // cancleEvent();//window的阻止事件
    // 阻止右键
    document.addEventListener("contextmenu", (event) => event.preventDefault());
});

/**
 * 处理连接登录逻辑
 * @param {Object} data - 包含连接信息的对象
 */
const connectLogin = (data) => {
    // 默认关闭登录钱包界面
    loginWallt.value = false;

    // 检查数据中是否包含连接器信息，并判断连接器类型是否为钱包连接
    if (data.connector && data.connector["type"] == "walletConnect") {
        // 开始登录加载状态
        loading.value = true;
        waitForWaltConnect().then((isLoaded) => {
            if (isLoaded) {
                loading.value = false;
            } else {
                loading.value = false;
            }
        });
    }

    // 调用连接函数进行登录
    connect(data);
};
// 监听账户切换操作
watchAccount(config, {
    onChange(res) {
        if (res.isConnected) {
            if (!store.getters.token) {
                //先隐藏
                // 唤醒签名提示弹框
                store.commit("setAuthorize", true);
            } else {
                //后端登录token过期时，重新登录
                if (isCheckTimeout()) {
                    // 唤醒签名提示弹框
                    store.commit("setAuthorize", true);
                }
                //当前地址与缓存地址不一致时，重新登录
                const currentAddress = res.address?.toLocaleLowerCase();
                const cachedAddress =
                    store.getters.userInfo.address?.toLocaleLowerCase();
                if (currentAddress && currentAddress !== cachedAddress) {
                    // 唤醒签名提示弹框
                    store.commit("sethandoffWallt", true);
                    store.dispatch("user/logout");
                }
            }
        } else {
            // 第一次获取的状态是false，此处需要做特殊处理，判断是否真的未登录状态
            // if (store.getters.token !== '') {
            // store.dispatch('user/logout')
            // }
        }
    },
});
watch(
    () => store.state,
    async (oldV, newV) => {
        if (!newV) return;
        authorizeBol.value = newV.authorize; //主动唤醒登录弹框
        handoffWalltBol.value = newV.handoffWallt; //切换钱包唤醒登录
    },
    { deep: true }
);
const checkPc = () => {
    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
        isPc.value = false;
    } else {
        isPc.value = true;
    }
};
// 关闭和取消登录
const closeAuthorize = async () => {
    loading.value = false;
    // 关闭签名提示弹框
    store.commit("setAuthorize", false);
    // 登出设置，避免出现连接了但是未登录状态
    await store.dispatch("user/logout");
};
const closeHandoffWallt = async () => {
    // 关闭重新登录提示弹框
    store.commit("sethandoffWallt", false);
    // 登出设置，避免出现连接了但是未登录状态
    await store.dispatch("user/logout");
};
const doConnect = async () => {
    await store.dispatch("user/logout");
    store.commit("sethandoffWallt", false);
    loginWallt.value = true;
};
// 登录
const checkLogin = () => {
    loading.value = true;
    // 关闭签名提示弹框
    store.commit("setAuthorize", false);
    store.dispatch("user/login");
};
checkPc();

// 监听是否弹出链接钱包弹框
bus.on("wellatModal", (res) => {
    walletModal.value = true;
});
// 监听登录状态变化
watch(
    () => status.value,
    async (newV) => {
        if (newV == "connected") {
            if (!isLogin.value) {
                // 唤醒签名提示弹框
                store.commit("setAuthorize", true);
            }
        }
    }
);
</script>