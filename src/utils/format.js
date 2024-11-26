import axios from 'axios'
import bus from '@/utils/bus.js'
const request = axios.create({
  timeout: 60000
})
// 根据url获取图片base64数据，去掉前后盐值，并加上base64前缀
export const getImageBase64 = async (src) => {
  let result = ''
  await request({
    url: src,
    method: 'GET'
  }).then((res) => {
    result = res.data
  }).catch((err) => {
  })
  return result === '' ? result : 'data:image/png;base64,' + result.replace(/^dimai|dimai$/g, '')
}
// 获取nft图片
export const getImageBase64Nft = async (src) => {
  pushAxios()
  let result = null
  await request({
    url: src,
    method: 'GET'
  }).then((res) => {
    popAxios()
    result = res.data;
  }).catch((err) => {
    popAxios()
    result = err;
  })
  return result;
}
export const getBase64 = async (url) => {
  pushAxios()
  if (url && url.indexOf("data:image/png;base64") === 0) {
    popAxios()
    return url
  }
  const newUrl = await request({
    url: url,
    method: 'GET'
  }).then(res => {
    let result = res.data;
    result = result === '' ? result : 'data:image/png;base64,' + result.replace(/^dimai|dimai$/g, '');
    // 如果图片的 base64 编码中存在换行符，可能会导致 HTML 的 img 元素无法正常显示
    result = result === '' ? result : result.replace(/\s/g, "");
    popAxios()
    return result
  })
  return newUrl
}

// 瀑布流，监听图片是否全部加载完毕
let axiosList = [];
function pushAxios() {
  //每次启动请求都添加数组
  axiosList.push(1);
  // 此处可以添加全局loading，防止还有接口为完成的时候用户误操作
  bus.emit('imageLoading', true)
}
function popAxios() {
  //接口有返回不管成功失败都要删除一个数组数据
  axiosList.pop()
  // 关闭全局loading
  if (!axiosList.length) {//此时表示接口都调用完成
    debounce(function () {
      bus.emit('imageLoading', false);
    }, 300)()
  }
}
// 函数防抖
function debounce(fn, delay = 300) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.call(this, ...args)
    }, delay);
  }
}