<style scoped lang="scss">
@import "./index.scss";
</style>
<template src="./index.html"></template>
<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
import axios from "axios";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import bus from "@/utils/bus.js";
const files = import.meta.glob("/public/**/*");
// ERC20合约
import contractContent20 from "./components/contractContent20/index.vue";
// ERC721合约
import contractContent721 from "./components/contractContent721/index.vue";
// ERC1155合约
import contractContent1155 from "./components/contractContent1155/index.vue";
// Stablecoin合约
import contractStablecoin from "./components/contractStablecoin/index.vue";
// realWorldAsset
import contractRealWorldAsset from "./components/realWorldAsset/index.vue";
// governor
import contractGovernor from "./components/governor/index.vue";
// custom
import contractCustom from "./components/custom/index.vue";

let contractType = ref("ERC20");
// 获取public文件结构
const filesStructure = ref(null);
let showMoreContract = ref(false);
// 获取需要的project文件夹
const projectFiles = ref([]);
// 获取需要的文件
const projectFile = ref(null);
const visible = ref(false);
onMounted(() => {});
const contractTypes = ref([
    { name: "ERC20", type: "ERC20", index: 0 },
    { name: "ERC721", type: "ERC721", index: 1 },
    { name: "ERC1155", type: "ERC1155", index: 2 },
    { name: "Stablecoin*", type: "stablecoin", index: 3 },
    { name: "Real-World Asset*", type: "realWorldAsset", index: 4 },
    { name: "Governor", type: "governor", index: 5 },
    { name: "Custom", type: "custom", index: 6 },
]);

const checkContractType = (data) => {
    console.log(data);
    contractType.value = data.type;
    let arr = contractTypes.value;
    if (data.index >= 0 && data.index < arr.length) {
        let element = arr.splice(data.index, 1)[0]; // 删除并获取指定下标的元素
        arr.unshift(element); // 将元素添加到数组的第一个位置
    }
    console.log(arr, "arr");
    arr.forEach((item, index) => {
        item.index = index;
    });
    contractTypes.value = arr;
};

// 将下载，复制的逻辑放在对应的合约组件里面，方便数据的处理
// 复制数据
const copySol = () => {
    console.log(contractType.value + "copy");

    bus.emit(contractType.value + "copy", contractType.value);
};
// 下载数据
const downloadSol = () => {
    bus.emit(contractType.value + "down", contractType.value);
};
// 下载压缩包
const downFils = (type) => {
    bus.emit(contractType.value + "zip", type);
};
</script>
