import { VueQueryPlugin } from '@tanstack/vue-query'
import { WagmiPlugin } from '@wagmi/vue'
import { createApp } from 'vue'
import router from './router/index'
import VueAxios from 'vue-axios'
import dialogModal from "@/components/dialogModal/index.vue"
import App from './App.vue'
import './style.css'
import { config } from './wagmi'

import 'ant-design-vue/dist/antd.css';
import '/public/css/style.scss'
import "@/assets/css/common.scss";
import "@/assets/css/fontStyle.scss";
import "@/assets/css/publicStyle.scss";
import "@/assets/css/antd.scss";
import '/public/js/flexible.js'
// 导入 vue-cropper
import VueCropper from 'vue-cropper'
import 'vue-cropper/dist/index.css'
import loadingDirective from '@/components/loading/directive.js'
import routeDirective from '@/components/loading/route-directive.js'
//引入依赖和语言
import 'highlight.js/styles/stackoverflow-dark.css'
import hljs from "highlight.js/lib/core";
import hljsVuePlugin from "@highlightjs/vue-plugin";
//import "highlight.js/lib/common"; //单一加载
//按需引入语言
import javascript from "highlight.js/lib/languages/javascript";
// import java from "highlight.js/lib/languages/java";
// import sql from "highlight.js/lib/languages/sql";
// import xml from "highlight.js/lib/languages/xml";
// import html from "highlight.js/lib/languages/vbscript-html";
// import json from "highlight.js/lib/languages/json";
// import yaml from "highlight.js/lib/languages/json";
hljs.registerLanguage("javascript", javascript);
import {
    Checkbox, Input, Radio, Select, SelectOption, Tooltip, Popover
} from 'ant-design-vue';
const app = createApp(App)
app.directive('loading', loadingDirective)
app.directive('route-loading', routeDirective)
app.use(router)
    .use(VueCropper)
    .use(Checkbox)
    .use(Input)
    .use(Select)
    .use(SelectOption)
    .use(Radio)
    .use(Popover)
    .use(Tooltip)
app.component('dialogModal', dialogModal)
app.use(WagmiPlugin, { config }).use(VueQueryPlugin, {})
app.use(hljsVuePlugin)
app.mount('#app')
