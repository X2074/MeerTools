<template src="./index.html"></template>
<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
import router from "@/router";
// import * as api from "@/api/sys.js";
// import i18n from "@/i18n";
// import subscribe from "./subscribe/index.vue";
// import subscribe from "../subscribe/index.vue";
const subData = ref("");
const subShow = ref(false);
// 语言切换部分
// import { useI18n } from "vue-i18n";
// const { locale } = useI18n();
const language = ref("en");
// watch(locale, (newV) => {
//   language.value = newV;
// });
const openLink = (url) => {
  router.push(url, "_blank");
};
const jumpUrl = {
  document: "https://qitmeernetwork.gitbook.io/docs/",
  github: "https://github.com/Qitmeer",
  twitter: "https://twitter.com/QitmeerNetwork",
  telegram: "https://t.me/qitmeernetwork",
  discord: "https://discord.gg/xzGSmrzXTM",
  medium: "https://qitmeer.medium.com/",
  blog: "https://open.spotify.com/episode/7wirwF65l4FPxM2J5zyo4Y?si=lLHahPvoTr2U8V_Dzh7Qhg&nd=1",
  whitepaper:
    "https://github.com/Qitmeer/whitepaper/releases/download/v0.6.5/qitmeer_whitepaper.pdf",
  youtube: "https://www.youtube.com/@qitmeernetwork",
};
const menu = ref([]);
menu.value = [
  {
    name: "Ecological project",
    child: [
      { name: "DimAI", path: "https://www.dimai.ai/index", target: "_blank" },
      { name: "Woowow", path: "https://woowow.io/", target: "_blank" },
      { name: "KAHF", path: "https://www.kahf.io/", target: "_blank" },
      {
        name: "Candy Swap",
        path: "https://candyswap.exchange/swap",
        target: "_blank",
      },
    ],
  },
  {
    name: "Qitmeer",
    child: [{ name: "Qitmeer", path: "https://qitmeer.io", target: "_blank" }],
  },
  {
    name: "Tool module",
    child: [
      { name: "Faucet", path: "https://faucet.qitmeer.io", target: "_blank" },
      { name: "Batch Transfer", path: "", target: "_blank" },
      { name: "Smart Contract Auto Deployment", path: "", target: "_blank" },
      { name: "Supply Query", path: "", target: "_blank" },
      { name: "Ecological Project Review", path: "", target: "_blank" },
    ],
  },
  {
    name: "Block Explorer",
    child: [{ name: "Qitmeer Network", path: "", target: "_blank" }],
  },
];
</script>
<style scoped lang="scss">
@import "./index.scss";
</style>