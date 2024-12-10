<style scoped lang="scss">
@import "./index.scss";
</style>
<template src="./index.html"></template>
<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
// ERC20合约
import contractContent20 from "./components/contractContent20/index.vue";
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
