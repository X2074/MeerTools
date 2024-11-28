import { VueQueryPlugin } from '@tanstack/vue-query'
import { WagmiPlugin } from '@wagmi/vue'
import { createApp } from 'vue'
import router from './router/index'
import VueAxios from 'vue-axios'
import dialogModal from "@/components/dialogModal/index.vue"
import axios from './utils/request'
import App from './App.vue'
import './style.css'
import { config } from './wagmi'

import 'ant-design-vue/dist/antd.css';
import '/public/css/style.scss'
import "@/assets/css/common.scss";
import "@/assets/css/fontStyle.scss";
import "@/assets/css/publicStyle.scss";
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
import java from "highlight.js/lib/languages/java";
import sql from "highlight.js/lib/languages/sql";
import xml from "highlight.js/lib/languages/xml";
import html from "highlight.js/lib/languages/vbscript-html";
import json from "highlight.js/lib/languages/json";
import yaml from "highlight.js/lib/languages/json";
hljs.registerLanguage("javascript", javascript);
import {
    Affix, Avatar, Button, Breadcrumb, Card, Carousel, Checkbox, Comment, Col, Collapse, Dropdown, DatePicker, Form, Image, Input, InputNumber, List, Layout, LocaleProvider, Menu, message, Modal, Popover, Popconfirm, Pagination, Row, Radio, Select, SelectOption, Switch, Steps, Tabs, Timeline, Tooltip, Tree, Upload, Progress, Spin, Table, Slider, Badge
} from 'ant-design-vue';

const app = createApp(App)
app.directive('loading', loadingDirective)
app.directive('route-loading', routeDirective)

app.use(VueAxios, axios)
app.use(router)
    .use(VueCropper)
    .use(Upload)
    .use(Button)
    .use(Breadcrumb)
    .use(InputNumber)
    .use(Avatar)
    .use(Dropdown)
    .use(Menu)
    .use(Row)
    .use(Col)
    .use(Card)
    .use(Checkbox)
    .use(Tabs)
    .use(Table)
    .use(Modal)
    .use(Tooltip)
    .use(Input)
    .use(Carousel)
    .use(Affix)
    .use(List)
    .use(Comment)
    .use(Select)
    .use(SelectOption)
    .use(Image)
    .use(Form)
    .use(Timeline)
    .use(Tree)
    .use(LocaleProvider)
    .use(Radio)
    .use(Switch)
    .use(Collapse)
    .use(Layout)
    .use(Steps)
    .use(Popover)
    .use(Pagination)
    .use(Popconfirm)
    .use(DatePicker)
    .use(Progress)
    .use(Spin)
    .use(Slider)
    .use(Badge)
app.component('dialogModal', dialogModal)
app.use(WagmiPlugin, { config }).use(VueQueryPlugin, {})
app.use(hljsVuePlugin)
app.mount('#app')
