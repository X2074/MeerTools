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
import route from "@/router";
import { Upload } from "ant-design-vue";
import bus from "@/utils/bus.js";
import useClipboard from "vue-clipboard3";
const { toClipboard } = useClipboard();
import menusHeader from "../menus.js";

import Web3 from "web3";
const menusHeaderList = ref(menusHeader);

const router = useRouter();
// import { useLocalWatch, useLocal } from "@/hooks/useLocal";
//设置语言
// const language = ref(null);
let loginWallt = ref(false);
// 语言切换监听
// useLocalWatch((res) => {
//     language.value = res;
// });
let userUnBind = ref(null); //是否未绑定
const userInfo = ref(store.getters.userInfo);
const nickname = ref(userInfo.value.name); //昵称
const avatar = ref(null);
const formState = ref({
    avatar: userInfo.value.avatar + "?" + new Date(),
});

// 唤起钱包模块
const { connect, connectors, error } = useConnect();
// 获取登录信息模块
const { address, chainId, status } = useAccount();
// 退出登录
const { disconnect } = useDisconnect();
const account = useAccount();

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
        confirmLoading.value = true;
        waitForWaltConnect().then((isLoaded) => {
            if (isLoaded) {
                confirmLoading.value = false;
            } else {
                confirmLoading.value = false;
            }
        });
    }

    // 调用连接函数进行登录
    connect(data);
};
// 是否存在未读消息
let unMessages = ref(false);
// 判断是否亮小红点
watch(
    () => store.state.userUnReadMessage,
    async (newV) => {
        // 如果存在未读消息
        if (newV) {
            unMessages.value = newV;
        } else {
            unMessages.value = false;
        }
    },
    { immediate: true }
);
const toMessage = () => {
    route.push("/messages");
};
// 设置语言
const setLang = (type) => {
    bus.emit("langiageModal", true);
};
const current = ref(0);
const czMenu = [
    { title: "headerFooter.deposit", path: "purchase", type: "cz" },
    { title: "personal.dim01", path: "/purchase-record", type: "record" },
    { title: "personal.dim02", path: "/use-record", type: "record" },
];
const isLogin = ref(store.getters.token && store.getters.userInfo);

const logOut = async () => {
    await store.dispatch("user/logout");
    setTimeout(() => {
        location.replace(location.origin + "/index");
    }, 500);
};
watch(
    () => store.getters.token,
    async (newV) => {
        if (store.getters.token && store.getters.userInfo) isLogin.value = true;
        else isLogin.value = false;
        if (isLogin.value) {
            getMessagesList();
            getUserInfo();
            userInfo.value = store.getters.userInfo;
            newImg.value = userInfo.value.avatar
                ? userInfo.value.avatar + "?" + new Date()
                : "";
        }
    }
);

// 获取未读站内信
const getMessagesList = () => {
    // 当前页面是站内信就不需要调用接口
    if (router.currentRoute.value.path == "/messages") return;
    let data = {
        page: 1,
        limit: 10,
        readed: false,
    };
    store.dispatch("messages/getMessagesList", data);
};
watch(
    () => store.state.userUnBind,
    async (newV) => {
        // 如果存在未读消
        if (newV) {
            userUnBind.value = true;
        } else {
            userUnBind.value = false;
        }
    },
    { immediate: true }
);
watch(
    () => store.getters.userInfo,
    async (newV) => {
        userInfo.value = newV;
        avatar.value = userInfo.value.avatar + "?" + new Date();
        newImg.value = userInfo.value.avatar
            ? userInfo.value.avatar + "?" + new Date()
            : "";
    }
);
const getUserInfo = () => {
    store.dispatch("user/getUserInfo").then((res: any) => {
        if (res) {
            userInfo.value = res?.info;
            avatar.value = userInfo.value.avatar + "?" + new Date();
            newImg.value = userInfo.value.avatar
                ? userInfo.value.avatar + "?" + new Date()
                : "";
        }
    });
};
onMounted(async () => {
    if (store.getters.token && store.getters.userInfo) {
        getUserInfo();
        getMessagesList();
        if (chainId.value != DEFAULT_CHAINID) {
            await changeChain(DEFAULT_CHAINID);
        }
    } else {
        if (status.value == "connected") {
            // 唤醒签名提示弹框
            store.commit("setAuthorize", true);
        }
    }
});

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
// 获取图片
const previewImage = ref(null);
const imageInput = ref(null);

const uploadImage = (event) => {
    event.preventDefault();
    imageInput.value.click();
};
const getPreviewImage = (event) => {
    const file = event.target.files[0];
    tmpFileName.value = file.name;
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
    const reader = new FileReader();
    reader.onload = () => {
        visible.value = true;
        previewImage.value = reader.result;
    };
    reader.readAsDataURL(file);
};

// vue-cropper相关配置 详细的可以去github上看文档
const img = ref(null);
const newImg = ref(null);
const cropper = ref(null);
const tmpFileName = ref(null);
const confirmLoading = ref(false);
const contentEdit = ref(false);

const options = ref({
    autoCrop: true, // 是否默认生成截图框
    autoCropWidth: "500", // 默认生成截图框宽度
    autoCropHeight: "500", // 默认生成截图框高度
    fixedBox: true, // 固定截图框大小,不允许改变
    centerBox: true, // 截图框是否被限制在图片里面
    fixed: true, // 是否开启截图框宽高固定比例
    fixedNumber: ["500", "500"], // 截图框的宽高比例 [ 宽度 , 高度 ]
});
// 图片放大
const scaleBigger = () => {
    cropper.value.changeScale(1);
};
// 图片缩小
const scaleSmaller = () => {
    cropper.value.changeScale(-1);
};
// 图片右旋转90°
const rotateRight = () => {
    cropper.value.rotateRight();
};
// 图片右旋转90°
const rotateLeft = () => {
    cropper.value.rotateLeft();
};
// 图片上传
const uploadFile = () => {
    confirmLoading.value = true;
    // getCropBlob获取二进制数据
    cropper.value.getCropData((data) => {
        newImg.value = data;
        const file = dataURLtoFile(data, tmpFileName.value);
        store
            .dispatch("user/updateAvatar", file)
            .then((res) => {
                store.dispatch("user/getUserInfo");
                confirmLoading.value = false;
                visible.value = false;
                // bus.emit("promptModalSuccess", i18n.global.t("prompt.txt05"));
            })
            .catch((err) => {
                confirmLoading.value = false;
                // bus.emit("promptModalErr", i18n.global.t("prompt.txt06"));
            });
    });
};
const dataURLtoFile = (dataurl, filename) => {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let len = bstr.length;
    const u8arr = new Uint8Array(len);
    while (len--) {
        u8arr[len] = bstr.charCodeAt(len);
    }
    return new File([u8arr], filename, { type: mime });
};
// 修改用户信息部分

const showNick = ref(false); //显示修改昵称输入框
const visible = ref(false); //昵称弹框
const handleUpdateName = () => {
    showNick.value = !showNick.value;
};
const updateUserNickname = () => {
    confirmLoading.value = true;
    store
        .dispatch("user/updateUserNickname", nickname.value)
        .then((res: any) => {
            const info = {
                address: userInfo.value.address,
                avatar: formState.value.avatar,
                name: nickname.value,
            };
            store.commit("user/setUserInfo", info);
            // bus.emit("promptModalSuccess", i18n.global.t("prompt.txt01"));
            showNick.value = false;
            confirmLoading.value = false;
        })
        .catch((err) => {
            confirmLoading.value = false;
            // bus.emit("promptModalErr", i18n.global.t("prompt.txt02"));
        });
};
const copy = async (Msg: any) => {
    try {
        //复制
        await toClipboard(Msg);
        // bus.emit("promptModalSuccess", i18n.global.t("personal.copySuccess"));
    } catch (e) {
        //复制失败
        // bus.emit("promptModalErr", i18n.global.t("personal.copyFail"));
    }
};
// 关闭编辑框
const cloceEdit = () => {
    contentEdit.value = false;
    showNick.value = false;
    menusHeaderList.value.forEach((item) => {
        if (!item.path) item.zoom = false;
    });
};

// 导航栏打开页面
const openPage = (data) => {
    if (data.path) {
        cloceEdit();
        if (data.type) {
            window.open(data.path);
        } else {
            router.push(data.path);
        }
    } else {
        data.zoom = !data.zoom;
    }
};
</script>
<style scoped lang="scss">
@import "@/assets/css/header.scss";
@import "./index.scss";
</style>