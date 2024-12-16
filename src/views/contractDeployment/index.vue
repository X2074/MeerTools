<style scoped lang="scss">
@import "./index.scss";
</style>
<template src="./index.html"></template>
<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
import axios from "axios";
import JSZip from "jszip";
import { saveAs } from "file-saver";
const files = import.meta.glob("/public/**/*");
// ERC20合约
import contractContent20 from "./components/contractContent20/index.vue";
// 获取public文件结构
const filesStructure = ref(null);
// 获取需要的project文件夹
const projectFiles = ref([]);
// 获取需要的文件
const projectFile = ref(null);

onMounted(() => {});
const contractTypes = [
    { name: "ERC20", type: "" },
    { name: "ERC721", type: "" },
    { name: "ERC1155", type: "" },
    { name: "Stablecoin*", type: "" },
    { name: "Real-World Asset*", type: "" },
    { name: "Governor", type: "" },
    { name: "Custom", type: "" },
];
</script>
