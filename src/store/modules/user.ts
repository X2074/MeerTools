
import {
    getEssay,
    getEssayDetail
} from "@/api/essay";
// import { getItem } from "@/utils/storage";
import { TOKEN, USER_INFO, DIM_BALANCE, TOKEN_RENEW_TIKMES, ANTI } from "@/api/constant";
export default {
    namespaced: true,
    state: () => ({
        // token: getItem(TOKEN) || "",
        // userInfo: getItem(USER_INFO) || {},
        // renewTimes: getItem(TOKEN_RENEW_TIKMES) || 0,
        // dim_balance: getItem(DIM_BALANCE) || 0
    }),
    mutations: {
        getEssay(context, data) {
            return getEssay(data)
        },
        getEssayDetail(context, data) {
            return getEssayDetail(data)
        },


    }
};
