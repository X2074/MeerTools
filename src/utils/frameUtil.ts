
interface MyInterface {  
    setRem(params?: number): void;
    watchResize(params : number): void; 
}  
  
let frameUtil: MyInterface = {  
    setRem(params = 1920) {
        // 注销window的resize方法
        window.removeEventListener('resize', this.watchResize);
        // 根据新的设计宽度作为底，响应resize事件
        this.watchResize(params);
        window.addEventListener('resize',(params) => this.watchResize(params));
    },
    watchResize(params) {
        // 基本大小，和webpack.config里配置的数值一样
        const baseSize = 100
        // 当前页面宽度相对于 1920 宽的缩放比例，可根据自己设计图的宽度修改。
        const scale = document.documentElement.clientWidth / params
        // 设置页面根节点字体大小，比例 1/4 - 2
        document.documentElement.style.fontSize = (baseSize * Math.min(Math.max(0.25, scale), 2)) + 'px'
      }
};  

export default {
    frameUtil
}