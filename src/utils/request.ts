import axios from "axios";
import bus from "./bus.js";
// import i18n from '@/i18n';
// import { TOKEN } from '@/api/constant'
// import { getItem, setItem } from './storage.js'
// import { isCheckTimeout } from "@/api/sys"
import store from '@/store'
import router from "@/router/index";

// 处理  类型“AxiosResponse<any, any>”上不存在属性“errorinfo”。ts(2339) 脑壳疼！关键一步。
declare module "axios" {
    interface AxiosResponse<T = any> {
        code: null
        // 这里追加你的参数
    }
    export function create(config?: AxiosRequestConfig): AxiosInstance;
}
let axiosList = [];
let loginType = false;//判断是否需要弹出登录
function pushAxios() {
    //每次启动请求都添加数组
    axiosList.push(1);
    // 此处可以添加全局loading，防止还有接口为完成的时候用户误操作
    bus.emit('vLoading', true)
}
function popAxios() {
    //接口有返回不管成功失败都要删除一个数组数据
    axiosList.pop()
    // 关闭全局loading
    if (!axiosList.length) {//此时表示接口都调用完成
        bus.emit('vLoading', false);
        if (loginType) {//未登录，可以拉起登录弹框
            // 打开登录弹框
            bus.emit("openModal");
        }
        loginType = false;//登录状态判断初始化
    }
}
// 配置config
let baseURL = {
    api: '/api/v1',
    crypto: ""
};

// 创建axios实例
const service = axios.create({
    // 在请求地址前面加上baseURL
    // baseURL: baseURL,
    // 当发送跨域请求时携带cookie
    // withCredentials: true,
    timeout: 1200000,
});

// 请求拦截
service.interceptors.request.use(
    (config) => {
        if (config.url.includes('/crypto/v1') || config.url.includes('/offchaindata')) {
            config.url = baseURL.crypto + config.url;
        } else if (!config.url.includes('https')) {
            config.url = baseURL.api + config.url
        }
        pushAxios()
        // 模拟指定请求令牌
        // if (getItem(TOKEN)) {
        //     if (isCheckTimeout()) {
        //         store.dispatch('user/logout')
        //     } else {
        //         config.headers['Authorization'] = getItem(TOKEN);
        //     }
        // }
        return config;
    },
    (error) => {
        // 请求错误的统一处理
        return Promise.reject(error);
    }
);

// 响应拦截器
service.interceptors.response.use(
    (response) => {
        const data = response.data
        popAxios()
        return data
    },
    (error) => {
        popAxios()
        // 兼容blob下载出错json提示
        if (error.response.data instanceof Blob && error.response.data.type.toLowerCase().indexOf('json') !== -1) {
            const reader: any = new FileReader()
            reader.readAsText(error.response.data, 'utf-8')
            reader.onload = function (e) {
                const errorMsg = JSON.parse(reader.result).message;
                // bus.emit('promptModalErr', i18n.global.t('prompt.txt04'))
            }
        } else {
            let code = 0
            try {
                code = error.response.status
            } catch (e) {
                if (error.toString().indexOf('Error: timeout') !== -1) {
                    // bus.emit('promptModalErr', i18n.global.t('prompt.txt03'))
                    return Promise.reject(error)
                }
            }

            if (code) {
                if (code === 401) {
                    setTimeout(() => {
                        router.push('/index')
                    }, 1000);
                    store.dispatch('user/logout');
                } else {
                    const errorMsg = error.response.data.message;
                    if (errorMsg !== undefined) {
                        // bus.emit('promptModalErr', i18n.global.t('prompt.txt04'))
                    }
                }
            } else {
                // bus.emit('promptModalErr', i18n.global.t('prompt.txt04'))
            }
        }
        return Promise.reject(error)
    }

)


export default service;

