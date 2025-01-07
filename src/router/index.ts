import { createRouter, createWebHistory } from 'vue-router'
import bus from '@/utils/bus.js'

// 引入文件，动态路由
const routes = <any>[
    { path: '/:pathMath(.*)', redirect: '/index' },
    {

        path: "/",
        name: "",
        redirect: '/index',
        children: [
            {
                path: "/index",
                name: "index",
                component: () => import("@/views/homePage/index.vue"),
            },
            {
                path: "/faucet",
                name: "faucet",
                component: () => import("@/views/faucet/index.vue"),
            },
            {
                path: "/contractDeployment",
                name: "contractDeployment",
                component: () => import("@/views/contractDeployment/index.vue"),
            },
            {
                path: "/supplyQuery",
                name: "supplyQuery",
                component: () => import("@/views/supplyChain/index.vue"),
            },
            {
                path: "/batchTransfer",
                name: "batchTransfer",
                component: () => import("@/views/batchTransfer/index.vue"),
            },

        ]
    }

];
const router = createRouter({
    history: createWebHistory(),
    routes
})

// 全局前置守卫 按照创建顺序调用 守卫是异步执行的
router.beforeEach((to, from, next) => {
    // 页面加载慢，全部添加loading
    bus.emit('homePageLoad', true)
    if (to.matched.length === 0) {  // 如果未匹配到路由
        from.name ? next({ name: from.name }) : next('/index')
    } else {
        next()  // 如果匹配到正确跳转
    }
    next()  // 如果匹配到正确跳转
})
router.afterEach(() => {
    bus.emit('homePageLoad', false)
})
export default router
