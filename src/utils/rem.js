; (function () {
// 基本大小，和webpack.config里配置的数值一样
const baseSize = 100
// 设置 rem 函数
function setRem () {
  // 当前页面宽度相对于 1920 宽的缩放比例，可根据自己设计图的宽度修改。
  // const scale = document.documentElement.clientWidth / 1440
  const scale = window.outerWidth / 1920
  // 设置页面根节点字体大小，比例 1/4 - 2
  document.documentElement.style.fontSize = (baseSize * Math.min(Math.max(0.25, scale), 2)) + 'px'
}
// 初始化
setRem()
// 改变窗口大小时重新设置 rem
window.onresize = function () {
  setRem()
}
})()
