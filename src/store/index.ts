import { createStore } from 'vuex'
import getters from './getters'
import user from './modules/user'
import messages from './modules/messages'
export default createStore({
    state: {
        rechargeDimBol: false,
        mintImage: '',
        authorize: false,
        editImage: null,
        handoffWallt: false,
        promptInfo: null,
        promptTokenIds: null,
        promptProtract: null,
        userUnReadMessage: null,//是否存在未读数据,
        userUnBind: null//是否未绑定账户
    },
    getters,
    mutations: {
        setUserUnReadMessage(state, token) {
            state.userUnReadMessage = token;
        },
        setUserUnBind(state, token) {
            state.userUnBind = token;
        },
        /**
        * mutations修改数据源
        * @param state 数据原
        * @param payload 外部调用时 传入的参数
        */
        setRechargeDimBol(state, payload) {
            state.rechargeDimBol = payload;
        },

        //mint时候存留的图片信息 
        setMintImage(state, payload) {
            state.mintImage = payload;
        },
        // 图生图
        setEditImage(state, payload) {
            state.editImage = payload;
        },
        // 授权-提示
        setAuthorize(state, payload) {
            state.authorize = payload;
        },
        // 切换钱包-重新登录提示
        sethandoffWallt(state, payload) {
            state.handoffWallt = payload;
        },
        // mint prompt数据时保存的nft信息
        setPromptInfo(state, payload) {
            state.promptInfo = payload;
        },
        // mint prompttokenIds
        setPromptTokenIds(state, payload) {
            state.promptTokenIds = payload;
        },
        // 提示词绘制的时候保存的数据
        setPromptProtract(state, payload) {
            state.promptProtract = payload;
        }
    },
    actions: {
    },
    modules: {
        user,
        messages
    }
})