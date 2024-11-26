import { createStore } from 'vuex'
import user from './modules/user'
export default createStore({
    state: {
        userUnReadMessage: null,//是否存在未读数据,
    },
    mutations: {
        setUserUnReadMessage(state, token) {
            state.userUnReadMessage = token;
        }
    },
    actions: {
    },
    modules: {
        user
    }
})