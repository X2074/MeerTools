// import request from './requestSys.ts'
import { TOKEN, TIME_STAMP, TOKEN_TIMEOUT_VALUE, USER_INFO, TOKEN_DETECT_VALUE, TOKEN_RENEW_VALUE, TOKEN_RENEW_TIKMES } from './constant'
import bus from '@/utils/bus.js'
import requestAuth from '@/utils/requestAuth.ts'
// import { setCookie, getCookie } from "../utils";
import { setItem, getItem } from '@/utils/storage.js'
import { message } from 'ant-design-vue'
import router from '@/router'
import dayjs from 'dayjs'

/**
 * 获取验证码图片
 * Get the verification code image
 */
export const getCodeImg = () => {
  return requestAuth({
    url: '/auth/code',
    method: 'get'
  })
}

export const getUInfo = () => {
  return requestAuth({
    url: '/auth/info',
    method: 'get'
  })
}

/**
 * 记录token
 */
export function setToken(token) {
  return setItem(TOKEN, token)
}

/**
 * 获取token
 */
export function getToken() {
  return getItem(TOKEN)
}

/**
 * 设置用户信息
 */
export function setUserinfo(userinfo) {
  return setItem(USER_INFO, userinfo)
}

/**
 * 获取用户信息
 */
export function getUserinfo() {
  return getItem(USER_INFO)
}

/**
 * 获取时间戳
 * Get timestamp
 */
export function getTimeStamp() {
  return getItem(TIME_STAMP)
}

/**
 * 设置时间戳
 * Set timestamp
 */
export function setTimeStamp() {
  setItem(TIME_STAMP, Date.now())
}

/**
 * 判断token是否超时
 * Check whether the token timed out
 */
export function isCheckTimeout() {
  // 当前时间戳
  // current timestamp
  const currentTime = Date.now()
  // 缓存时间戳
  // timestamp in localStorage
  const timeStamp = getTimeStamp()

  let renewTimes = getItem(TOKEN_RENEW_TIKMES) || 0;
  // 小于半小时时自动为token续期
  if (currentTime < (timeStamp + TOKEN_TIMEOUT_VALUE + renewTimes * TOKEN_RENEW_VALUE) && currentTime > (timeStamp + TOKEN_TIMEOUT_VALUE + renewTimes * TOKEN_RENEW_VALUE - TOKEN_DETECT_VALUE)) {
    console.log('Token即将过期，过期时间：', (TOKEN_TIMEOUT_VALUE + renewTimes * TOKEN_RENEW_VALUE + timeStamp - currentTime) / 3600, '小时')
    renewTimes += 1;
    setItem(TOKEN_RENEW_TIKMES, renewTimes)
    console.log('已续期，过期时间：', (TOKEN_TIMEOUT_VALUE + renewTimes * TOKEN_RENEW_VALUE + timeStamp - currentTime) / 3600, '小时')
  }
  return currentTime - timeStamp > TOKEN_TIMEOUT_VALUE + renewTimes * TOKEN_RENEW_VALUE

  // return currentTime - timeStamp > TOKEN_TIMEOUT_VALUE
}

//判断是否登录，然后进行跳转
export async function doLogin() {
  if (!getItem(TOKEN) || isCheckTimeout()) {///这里判断下登陆条件,未登录 /token过期时，重新登录
    //这里处理未登录跳转页面或者打开弹窗等交互
    bus.emit('loginWallt', true)
    return false;
  } else {
    return true;
  }
}
/* export async function getEmailCode(data) {
  console.log(data)
  const res = await request({
    url: 'auth/code?' + Qs.stringify(data),
    method: 'POST'
  })
  message.success('验证码发送到邮箱')
  return res
}

export function networkStats() {
  return request({
    url: 'monitor/network-stats',
    method: 'GET'
  })
} */
export function subscribeEmail(data) {
  return requestAuth({
    url: 'emails',
    method: 'POST',
    data
  })
}
export const selectText = (language, text) => {
  if (!text) return ''
  if (text.startsWith('{')) {
    if (language === 'zh') {
      return JSON.parse(text).zh
    } else {
      return JSON.parse(text).en
    }
  } else {
    if (language === 'zh') {
      return ''
    } else {
      return text
    }
  }
}