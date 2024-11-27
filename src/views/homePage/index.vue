<style scoped lang="scss">
@import "./index.scss";
</style>
<template src="./index.html"></template>
<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
import headerCell from "@/components/blackCommon/header/index.vue";
import footerCell from "@/components/blackCommon/footer/index.vue";
const tool = [
  {
    title: "Faucet",
    txt: "Get your free MEER test tokens and start your blockchain journey.",
  },
  {
    title: "Batch Transfer",
    txt: "A convenient on-chain transfer tool that makes it easy to manage asset distribution.",
  },
  {
    title: "Smart Contract Auto Deployment",
    txt: "One-click deployment, simplifying the development of smart contracts.",
  },
  {
    title: "Supply Query",
    txt: "Obtain the circulation and total supply dynamics of MEER in real time.",
  },
  {
    title: "Ecological Project Review",
    txt: "Ensuring our ecosystem projects meet the highest standards.",
  },
];
</script>