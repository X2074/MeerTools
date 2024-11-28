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

const ecological = [
  {
    title: "DimAi",
    txt: "DimAI is a one-stop NFT creation platform leveraging AI-generated content for music, gaming, and virtual characters, fostering an innovative creative ecosystem.",
    link: "https://www.dimai.ai/index",
    img: "/images/index/e-dimai.svg",
  },
  {
    title: "Woowow",
    txt: "Woowow is an AI Agent-powered NFT trading platform providing transparent, fair, and efficient transactions while safeguarding intellectual property.",
    link: "https://woowow.io/",
    img: "/images/index/e-woowow.svg",
  },
  {
    title: "KAHF",
    txt: "KAHF Wallet is a secure, multi-chain wallet for convenient digital asset management.",
    link: "https://www.kahf.io/",
    img: "/images/index/kahf.svg",
  },
  {
    title: "Candy Swap",
    txt: "Candy swap is a decentralized trading platform using AMM, empowering users to trade assets seamlessly.",
    link: "https://candyswap.exchange/swap",
    img: "/images/index/candy.svg",
  },
];
</script>