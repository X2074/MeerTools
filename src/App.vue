<style scoped lang="scss">
.wrap {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  min-height: 100vh;
  .content {
    height: 0;
    flex: 1;
  }
}
</style>
<template>
  <div v-if="isPc" class="wrap" v-route-loading="homePageLoad">
    <headerCell></headerCell>
    <div class="content">
      <router-view />
    </div>
    <footerCell></footerCell>
  </div>

  <div class="model" v-else>
    <span class="info">
      <p>
        <span
          >The Tools is currently only accessible via desktop browsers. Mobile
          access is not supported at this time.</span
        >
      </p>
    </span>
  </div>
  <!-- 全局自动关闭提示 -->
  <prompt></prompt>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted, nextTick } from "vue";
import bus from "@/utils/bus.js";
import prompt from "@/components/prompt/index.vue";
import headerCell from "@/components/header/index.vue";
import footerCell from "@/components/footer/index.vue";
import { useRoute } from "vue-router";
const route = useRoute();
let isPc = ref(route.name == "index" ? true : false);
let homePageLoad = ref(false);
// 接收方
bus.on("homePageLoad", (res) => {
  homePageLoad.value = res;
  checkPc();
});
onMounted(() => {
  // cancleEvent();//window的阻止事件
  // 阻止右键
  document.addEventListener("contextmenu", (event) => event.preventDefault());
  window.addEventListener("resize", () => {
    checkPc();
  });
});
const checkPc = () => {
  if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
    if (route.name == "index") {
      isPc.value = true;
      return;
    }
    isPc.value = false;
  } else {
    if (window.innerWidth < 769) {
      isPc.value = false;
    } else {
      isPc.value = true;
    }
  }
};
watch(
  () => route.name,
  (newPath) => {
    if (newPath == "index") isPc.value = true;
  }
);
checkPc();
</script>