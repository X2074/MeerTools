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
// ERC721合约
import contractContent721 from "./components/contractContent721/index.vue";
// ERC1155合约
import contractContent1155 from "./components/contractContent1155/index.vue";
let contractType = ref("ERC20");
// 获取public文件结构
const filesStructure = ref(null);
// 获取需要的project文件夹
const projectFiles = ref([]);
// 获取需要的文件
const projectFile = ref(null);

onMounted(() => {});
const contractTypes = [
  { name: "ERC20", type: "ERC20" },
  { name: "ERC721", type: "ERC721" },
  { name: "ERC1155", type: "ERC1155" },
  { name: "Stablecoin*", type: "" },
  { name: "Real-World Asset*", type: "" },
  { name: "Governor", type: "" },
  { name: "Custom", type: "" },
];
</script>
