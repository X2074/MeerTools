// 自定义v-loading指令
import { createApp } from 'vue'
import Loading from './index.vue'
import { addClass, removeClass } from './shared'

// 该样式添加在了assets/scss/base.scss中，.g-relative{position: relative}
const relativeCls = 'g-relative'

const loadingDirective = {
    // 主要写一些钩子函数 在钩子中去实现逻辑
    /*
    指令主要是将loading组件生成的DOM动态插入到指令作用的DOM对象上（v-loading=true），
    如果v-loading=false那么就删除动态插入的
     */
    // 指令挂载时的钩子函数
    mounted(el, binding) {
        /* 
        el指向指令所在的dom 如 <div v-loading="true" id="box"> 那么el就是#box 
        binding.value就是代表的true
        */
        // 判断v-loading值为true动态插入到指令作用的节点下
        /* 
        如果创建组件对应的dom？先用这个loading组件新建一个vue实例（app对象），
        然后再动态取挂载，就会产生一个实例，在实例中拿到它的DOM对象
        */
        const app = createApp(Loading)
        // 拿到它的实例,挂载到动态创建的DOM上，vue开发是支持多实例的，可以创建多个实例
        /* 
        因为创建的元素没挂载到BODY上，实际也没有完成dom层的挂载，
        目的是创建出来的实例的DOM对象要挂载到el上（指令所在的DOM）
        */
        const instance = app.mount(document.createElement('div'))
        /* 
        因为instance在mounted中只创建一次，但是之后会经常用到，要保留起来
        如果要在其他的钩子函数也要访问它的话就存在参数的el对象上
        这样操作在其他钩子中也可以获取到这个实例
        */
        el.instance = instance
        // 通过binding.arg拿到动态参数,如果组件中有多个参数可以考虑传进来的是一个数组
        const title = binding.arg
        // 如果参数不是空 执行实例中的方法
        if (typeof title !== 'undefined') {
            instance.setTitle(title)
        }
        // binding.value就是代表指令传递的值
        if (binding.value) {
            append(el)
        }
    },
    // 当组件更新的时候执行，因为指令不是一成不变的
    // 比如由v-loading=true变为v-loading=false 就会执行
    updated(el, binding) {
        // 通过binding.arg拿到动态参数
        const title = binding.arg
        // 如果参数不是空 执行实例中的方法
        if (typeof title !== 'undefined') {
            el.instance.setTitle(title)
        }
        // 如果loading前后值不一致
        if (binding.value !== binding.oldValue) {
            // 如果是true那么就插入否则删除
            binding.value ? append(el) : remove(el)
        }
    }
}

// 元素挂载的操作
function append(el) {
    // 根据loading组件样式，是使用absolute，而当el不是fixed或retaive时候给其动态添加定位属性
    const style = getComputedStyle(el)
    // 判断el的样式中有无定位，===-1就是没有 希望v-loading不受样式限制
    // if (['absolute', 'fixed', 'relative'].indexOf(style.position) === -1) {
    addClass(el, relativeCls)
    // }

    // 因为loading组件生成的实例instance已经赋值给el.instance属性上了，所以在这里可以直接通过el拿到
    // el.instance.$el就是loading组件的DOM对象
    el.appendChild(el.instance.$el)
}

function remove(el) {
    removeClass(el, relativeCls)
    el.removeChild(el.instance.$el)
}

// 如果要在全局中使用，就在main.js中引入并注册
export default loadingDirective