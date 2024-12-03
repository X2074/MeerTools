import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
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
                path: "/test",
                name: "test",
                component: () => import("@/views/test/index.vue"),
            }
        ]
    }

];
const router = createRouter({
    history: createWebHistory(),
    routes
})

// 全局前置守卫 按照创建顺序调用 守卫是异步执行的
router.beforeEach((to, from, next) => {
    // 只有进入首页和页面刷新的时候才加载loading，因为首页加载比较慢
    if (!to.name || to.name == 'index' || !from.name) {
        bus.emit('homePageLoad', true)
    }
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
