
import {
    getMessages,
    getMessageDetail,
    messageReaded,
    messageDeleted
} from "@/api/messages";
import store from "@/store";

export default {
    namespaced: true,
    state: () => ({
    }),
    mutations: {
    },
    actions: {
        getMessagesList(context, data) {
            return new Promise((resolve, reject) => {
                getMessages(data).then((res: any) => {
                    if (typeof data['readed'] && typeof data['readed'] == 'boolean') {
                        // 存在未读数据就true
                        if (res.messages && res.messages.length) {
                            store.commit("setUserUnReadMessage", res.messages.length);
                        } else {
                            store.commit("setUserUnReadMessage", false);
                        }
                    }
                    resolve(res);
                }).catch((err) => {
                    reject(err);
                });
            });
        },
        getMessageDetail(context, data) {
            return getMessageDetail(data)
        },
        messageReaded(context, data) {
            return new Promise((resolve, reject) => {
                messageReaded(data).then((res: any) => {
                    resolve(res);
                    let data = {
                        page: 1,
                        limit: 10
                    }
                    store.dispatch('messages/getMessagesList', data)
                }).catch((err) => {
                    reject(err);
                });
            });
        },
        messageDeleted(context, data) {
            return messageDeleted(data)
        },
    }
};
