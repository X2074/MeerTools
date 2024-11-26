import request from "@/utils/request";
import { TOKEN, TIME_STAMP, TOKEN_TIMEOUT_VALUE, USER_INFO, TOKEN_DETECT_VALUE, TOKEN_RENEW_VALUE } from "./constant";
import { setItem, getItem } from "@/utils/storage.js";
import store from '@/store'

/**
 * 记录token
 */
export function setToken(token) {
    return setItem(TOKEN, token);
}
/**
 * 获取token
 */
export function getToken() {
    return getItem(TOKEN);
}

/**
 * 设置用户信息
 */
export function setUserinfo(userinfo) {
    return setItem(USER_INFO, userinfo);
}
/**
 * 获取用户信息
 */
export function getUserinfo() {
    return getItem(USER_INFO);
}
/**
 * 获取时间戳
 * Get timestamp
 */
export function getTimeStamp() {
    return getItem(TIME_STAMP);
}

/**
 * 设置时间戳
 * Set timestamp
 */
export function setTimeStamp() {
    setItem(TIME_STAMP, Date.now());
}

/**
 * 判断token是否超时
 * Check whether the token timed out
 */
export function isCheckTimeout() {
    // 当前时间戳
    // current timestamp
    const currentTime = Date.now();
    // 缓存时间戳
    // timestamp in localStorage
    const timeStamp = getTimeStamp();
    // 小于半小时时自动为token续期
    if (currentTime < (timeStamp + TOKEN_TIMEOUT_VALUE + store.getters.renewTimes * TOKEN_RENEW_VALUE) && currentTime > (timeStamp + TOKEN_TIMEOUT_VALUE + store.getters.renewTimes * TOKEN_RENEW_VALUE - TOKEN_DETECT_VALUE)) {
        console.log('Token即将过期，过期时间：', (TOKEN_TIMEOUT_VALUE + store.getters.renewTimes * TOKEN_RENEW_VALUE + timeStamp - currentTime) / 3600, '小时')
        store.commit('user/renewTokenTime')
        console.log('已续期，过期时间：', (TOKEN_TIMEOUT_VALUE + store.getters.renewTimes * TOKEN_RENEW_VALUE + timeStamp - currentTime) / 3600, '小时')
    }
    return currentTime - timeStamp > TOKEN_TIMEOUT_VALUE + store.getters.renewTimes * TOKEN_RENEW_VALUE
}
