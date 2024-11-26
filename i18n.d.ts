// for i18n
declare module 'vue/types/vue' {
  interface VueConstructor  {
    $t: any
  }
}
declare module 'vue/types/options' {
  interface ComponentOptions {
    t?: any
  }
}