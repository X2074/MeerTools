<style scoped lang="scss">
@import "./index.scss";
</style>
<template src="./index.html"></template>
<script lang="ts" setup>
import { ref } from "vue";
import router from "@/router";

// 引入样式
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css/bundle";
import { Autoplay, Navigation, Scrollbar, EffectFade } from "swiper";
// // 在modules加入要使用的模块
const modules = [Navigation, Scrollbar, Autoplay];

const tool = [
  {
    title: "Faucet",
    txt: "Get your free MEER test tokens and start your blockchain journey.",
    link: "https://faucet.qitmeer.io",
  },
  {
    title: "Batch Transfer",
    txt: "A convenient on-chain transfer tool that makes it easy to manage asset distribution.",
    link: "/batchTransfer",
  },
  {
    title: "Smart Contract Auto Deployment",
    txt: "One-click deployment, simplifying the development of smart contracts.",
    link: "/batchTransfer",
  },
  {
    title: "Supply Query",
    txt: "Obtain the circulation and total supply dynamics of MEER in real time.",
    link: "/supplyQuery",
  },
  {
    title: "Ecological Project Review",
    txt: "Ensuring our ecosystem projects meet the highest standards.",
    link: "",
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
    title: "Candyswap",
    txt: "Candyswap is a decentralized trading platform using AMM, empowering users to trade assets seamlessly.",
    link: "https://candyswap.exchange/swap",
    img: "/images/index/candy.svg",
  },
];
const goTo = (link) => {
  /* if (link.indexOf("http") > -1) {
    window.open(link, "_blank");
    return;
  } */
  let path = router.resolve({ path: link });
  window.open(path.href, "_blank");
};
const toolIndex = ref(1);
const handleMouseEnter = (i) => {
  toolIndex.value = i + 1;
};

const onSwiper = (swiper) => {
  // console.log(swiper);
};
const onSlideChange = () => {
  // console.log("slide change"); 
};
/* const swiperNext = () => {
  bannerAnimation01.value = false;
  bannerAnimation02.value = false;
  swiperSlides.value?.$el.swiper.slideNext();
}; */
const bannerData = [
  {
    name: "DimAI",
    path: "https://dimai.ai/index",
    img: "/images/index/dimai.svg",
    text: "AIGC-Powered One-Stop NFT Creation Platform",
    info: " Unleash the value of AI creation, stimulate your creativity, and create unique AI works.",
  },
  {
    name: "Woowow",
    path: "https://woowow.io/",
    img: "/images/index/woowow.svg",
    text: "AI Agent-Based NFT Trading Platform",
    info: "Woowow leads the path of NFT innovation!",
  },
  {
    name: "Advertising for Rent",
    path: "https://tools.qitmeer.io",
    img: "/images/index/rent.svg",
    text: "Brand Display for Lease",
    info: "Join our partnership program and amplify your brand globally among the blockchain community!",
  },
];
</script>