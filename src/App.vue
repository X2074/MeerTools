<style scoped lang="scss">
.wrap {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
  .content {
    height: 0;
    flex: 1;
  }
}
</style>
<template>
  <div v-if="isPc" class="wrap">
    <headerCell></headerCell>
    <div class="content">
      <router-view />
    </div>
    <footerCell></footerCell>
  </div>

  <div class="model" v-else>
    <span class="info">
      <p>
        <span>亲爱的，我们暂时不支持移动端浏览请使用电脑浏览DimAI</span>
      </p>
    </span>
  </div>
  <!-- 全局自动关闭提示 -->
  <prompt></prompt>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted, nextTick } from "vue";
import prompt from "@/components/prompt/index.vue";
import headerCell from "@/components/blackCommon/header/index.vue";
import footerCell from "@/components/blackCommon/footer/index.vue";

let isPc = ref(false);
onMounted(() => {
  // cancleEvent();//window的阻止事件
  // 阻止右键
  document.addEventListener("contextmenu", (event) => event.preventDefault());
});
const checkPc = () => {
  if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
    isPc.value = false;
  } else {
    isPc.value = true;
  }
};

checkPc();
</script>