<template>
    <div class="loader__wrap" role="alertdialog" aria-busy="true" aria-live="polite" aria-label="Loading…">
        <div class="loader" aria-hidden="true">
            <div class="loader__sq"></div>
            <div class="loader__sq"></div>
        </div>
    </div>
</template>
   
  <script type="text/ecmascript-6">
  // 使用的时候 在容器上添加 div v-loading="true"即可实现loading效果 无需import
  export default {
    name: 'loading',
    data() {
      return {
        title: ''
      }
    },
    methods: {
      setTitle(title) {
        this.title = title
      }
    }
  }
  </script>