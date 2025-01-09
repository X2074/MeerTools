import axios from "axios";
import bus from "./bus.js";
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
let baseURL = '/qitmeer-auth/api/';
// 创建axios实例
const service = axios.create({
	// 在请求地址前面加上baseURL
	baseURL: baseURL,
	// 当发送跨域请求时携带cookie
	// withCredentials: true,
	timeout: 5000,
});

// 请求拦截
service.interceptors.request.use(
	(config) => {
		pushAxios()
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
		const { status, msg, data } = response.data
		popAxios()
		if (status) {
			return data
		} else {
			// 业务错误
			let language = localStorage.getItem('lang') || 'en';
			let m = '';
			if (!msg) return Promise.reject(m)
			if (msg.startsWith('{')) {
				if (language === 'zh') {
					m = JSON.parse(msg).zh
				} else {
					m = JSON.parse(msg).en
				}
			} else {
				m = msg;
			}
			return m;
			console.log(Promise.reject(m))
			Promise.reject(m)
		}
	},
	(error) => {
		popAxios()
		// 兼容blob下载出错json提示
		if (error.response.data instanceof Blob && error.response.data.type.toLowerCase().indexOf('json') !== -1) {
			const reader: any = new FileReader()
			reader.readAsText(error.response.data, 'utf-8')
			reader.onload = function (e) {
				const errorMsg = JSON.parse(reader.result).message;
			}
		} else {
			let code = 0
			try {
				code = error.response.data.status
			} catch (e) {
				if (error.toString().indexOf('Error: timeout') !== -1) {
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
					}
				}
			} else {
			}
		}
		return Promise.reject(error)
	}

)


export default service;

