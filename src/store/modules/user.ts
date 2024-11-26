import {
    addImgToTheme,
    drawWx,
    drawLtImg2ImgByImg,
    getGallerys,
    getHotWords,
    getImgs,
    getTaskByToken,
    getTasks,
    getThemeImgs,
    getUserInfo,
    login,
    updateAvatar,
    updateUserNickname,
    getImgsWithTaskToken,
    addImgToCreativeSpaces,
    getCreativeSpacesImgs,
    deleteImgFromCreativeSpaces,
    likeImg,
    cancelLikeImg,
    addImgsToTheme,
    deleteImgsFromTheme,
    deleteImgs,
    getUserinfoByAddress,
    freeDraw,
    freeMint,
    subscriptionsEmail,
    taskStatus,
    getSocialImgs
} from "@/api/user";
import {
    getEssay,
    getEssayDetail
} from "@/api/essay";
import {
    setBind,
    getInvitations,
    getInvitationRank,
    contractsQuery,
    contractsStatistics,
    getInvitationCode
} from "@/api/invite";
import { setTimeStamp } from '@/api/sys';
import { getItem, removeItem, setItem } from "@/utils/storage";
import { TOKEN, USER_INFO, DIM_BALANCE, TOKEN_RENEW_TIKMES, ANTI } from "@/api/constant";
import { signMessage, getAccount, disconnect } from "@wagmi/core";
import dayjs from "dayjs";
import store from "@/store";
import { config } from '@/wagmi'
import { QngTestnet } from '@/api/constant'

export default {
    namespaced: true,
    state: () => ({
        token: getItem(TOKEN) || "",
        userInfo: getItem(USER_INFO) || {},
        renewTimes: getItem(TOKEN_RENEW_TIKMES) || 0,
        dim_balance: getItem(DIM_BALANCE) || 0
    }),
    mutations: {
        setToken(state, token) {
            state.token = token;
            setItem(TOKEN, token);
        },
        removeToken(state) {
            state.token = "";
            removeItem(TOKEN);
        },
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo;
            setItem(USER_INFO, userInfo);
        },
        removeUserInfo(state) {
            state.userInfo = {};
            removeItem(USER_INFO);
        },
        setDimBalance(state, balance) {
            state.dim_balance = balance
            setItem(DIM_BALANCE, balance)
        },
        /**
         * 记录token延续次数
         */
        renewTokenTime(state) {
            state.renewTimes = state.renewTimes + 1
            setItem(TOKEN_RENEW_TIKMES, state.renewTimes)
        },
        /**
         * 清除token延续次数
         */
        cleanRenew(state) {
            state.renewTimes = 0
            removeItem(TOKEN_RENEW_TIKMES)
        }
    },
    actions: {
        /**
         * 处理用户登录(web3)
         * Process user login
         */
        async login(context) {
            // 获取登录信息模块
            const account = getAccount(config);
            const loginContent = {
                method: "login",
                address: account.address.toLocaleLowerCase(),
                time: dayjs().valueOf(),
            };
            const loginMsg = JSON.stringify(loginContent);

            await signMessage(config, { message: loginMsg })
                .then((res) => {
                    const userInfo = {
                        signature: res,
                        message: loginMsg,
                    };
                    return new Promise((resolve, reject) => {
                        login(userInfo)
                            .then((res) => {
                                store.commit("user/setToken", res.token);
                                store.commit("user/setUserInfo", {
                                    address: res.address,
                                    name: res.name,
                                    avatar: res.avatar
                                });
                                setTimeStamp();
                                // 关闭签名提示弹框
                                store.commit("setAuthorize", false)
                                location.reload()
                                resolve(res);
                            })
                            .catch((err) => {
                                // 关闭签名提示弹框
                                store.commit("setAuthorize", false)
                                reject(err);
                            });
                    });
                })
                .catch((err) => {
                    // 退出登录
                    disconnect(config);
                    // 关闭签名提示弹框
                    store.commit("setAuthorize", false)
                });
        },
        /**
         * 主动登出用户
         * Logout user
         */
        logout() {
            // 获取登录信息模块
            const account = getAccount(config);
            store.commit("user/removeToken");
            store.commit("user/removeUserInfo");
            store.commit('user/cleanRenew');
            if (account.isConnected) {
                disconnect(config);
            }
        },
        /**
         * 获取热词
         * get hotwords
         * @param context
         * @returns {*}
         */
        getHotWords(context) {
            return getHotWords();
        },
        /*获取画廊*/
        getGallerys(context) {
            return getGallerys();
        },
        /**
         * 通过base64图片创建绘图任务
         * @param context
         * @param drawInfo
         * {
         *     "text": "Hello, World!",
         *     "anti": "123456",
         *     "steps": "1",
         *     "size": "1024*1024",
         *     "denoising_strength": "0.5",
         * }
         * @return
         * res: {
         *     "token": "2023072413441316efaeeee3aa2792635763c5caa852cd"
         * }
         */
        async drawLtImg2ImgByImg(context, drawInfo) {
            const { prompt, base_image } = drawInfo;
            return new Promise((resolve, reject) => {
                drawLtImg2ImgByImg({ prompt, base_image })
                    .then((res) => {
                        resolve(res);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        },
        /* 创建调用百度文心接口的绘画任务*/
        async drawWx(context, drawInfo) {
            return new Promise((resolve, reject) => {
                drawWx(drawInfo)
                    .then((res) => {
                        resolve(res);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        },
        /**
         * 获取用户绘画任务
         * get user's tasks
         * @param context
         * @returns {*}
         */
        getTasks(context) {
            return getTasks();
        },
        /**
         * 使用Token获取对应的task
         * @param context
         * @param taskToken
         * @returns {AxiosPromise}
         */
        getTaskByToken(context, taskToken) {
            return getTaskByToken(taskToken);
        },
        /**
         * 获取用户所有图片
         * get all pictures drawn by user
         * @param context
         * @returns {*}
         */
        getImgs(context, data) {
            return getImgs(data);
        },
        /**
         * 将图片加入到主题中
         * Add Image to Theme
         * @param context
         * @param imgId
         * @returns {Promise<unknown>}
         */
        async addImgToTheme(context, imgId) {
            return addImgToTheme({ img_id: imgId });
        },
        /**
         * 获取主题图片
         * get all theme images
         * @param context
         * @returns {
         *     "theme_img": [
         *         {
         *             "img_id": "",
         *             "img_url": "",
         *             "task_hash": "",
         *             "para": {
         *                 "num": "2",
         *                 "size": "1024*1024",
         *                 "style": "油画",
         *                 "text": "a red bird"
         *             },
         *             "model": "wx_odel",
         *             "minted": false,
         *             "themed": true,
         *             "creative_spaced": true,
         *             "user_address": "",
         *             "user_name": "",
         *             "like_count": 0,
         *             "liked": false,
         *             "created_time": "",
         *             "updated_time": ""
         *         },
         *     ],
         *     "total_img_num": 2
         * }
         */
        getThemeImgs(context, data) {
            return getThemeImgs(data);
        },
        /**
         * 获取用户信息
         */
        getUserInfo(context) {
            getUserInfo().then((res) => {
                // @ts-ignore
                const userinfo = { address: res.info.user_address, name: res.info.name, avatar: res.info.avatar, invitation_code: res.info.invitation_code, inviter_address: res.info.inviter_address, created_time: res.info.created_time, invitation_signature: res.info.invitation_signature };
                store.commit("user/setUserInfo", userinfo);
            });
        },
        /**
         * 更新用户昵称
         */
        async updateUserNickname(context, name) {
            return updateUserNickname(name);
        },
        /**
         * 更新用户头像
         */
        async updateAvatar(context, file) {
            const form = new FormData();
            form.append("avatar", file);
            return updateAvatar(form);
        },
        /**
         * 根据绘图任务的token查询图片信息
         * get imgs by taskToken
         * @param context
         * @param taskToken
         * @returns {AxiosPromise}
         */
        getImgsWithTaskToken(context, taskToken) {
            return getImgsWithTaskToken(taskToken);
        },
        /**
         * 添加创意空间图片
         * imgIds example： {
         *     "img_ids": ["",""]
         * }
         */
        addImgToCreativeSpaces(context, imgIds) {
            return addImgToCreativeSpaces({ img_ids: imgIds })
        },
        /**
         * 获取创意空间图片
         */
        getCreativeSpacesImgs(context, data) {
            return getCreativeSpacesImgs(data)
        },
        /**
         * 删除创意空间图片
         * imgIds example： {
         *     "img_ids": ["",""]
         * }
         */
        deleteImgFromCreativeSpaces(context, imgIds) {
            return deleteImgFromCreativeSpaces({ img_ids: imgIds })
        },
        //获取按点赞数量排名的创意空间图片
        getSocialImgs(context, data) {
            return getSocialImgs(data)
        },
        /**
         * 点赞图片
         * imgId example： {
         *     "img_id": ""
         * }
         */
        likeImg(context, imgId) {
            return likeImg({ img_id: imgId })
        },
        /**
         * 取消点赞图片
         * imgId example： {
         *     "img_id": ""
         * }
         */
        cancelLikeImg(context, imgId) {
            return cancelLikeImg({ img_id: imgId })
        },
        /**
         * 批量添加主题图片
         * imgIds example： {
         *     "img_ids": ["",""]
         * }
         */
        addImgsToTheme(context, imgIds) {
            return addImgsToTheme({ img_ids: imgIds })
        },
        /**
         * 批量删除主题图片
         * imgIds example： {
         *     "img_ids": ["",""]
         * }
         */
        deleteImgsFromTheme(context, imgIds) {
            return deleteImgsFromTheme({ img_ids: imgIds })
        },
        /**
         * 批量删除图片
         * imgIds example： {
         *     "img_ids": ["",""]
         * }
         */
        deleteImgs(context, imgIds) {
            return deleteImgs({ img_ids: imgIds })
        },
        /**
         * 根据用户钱包地址查询用户信息
         * res： {
         *     "user_address": "",
         *     "name": "",
         *     "avatar": ""
         * }
         */
        getUserinfoByAddress(context, address) {
            return getUserinfoByAddress(address.toLocaleLowerCase())
        },

        freeDraw(context, token) {
            return freeDraw({ taskToken: token })
        },
        freeMint(context, data) {
            return freeMint(data)
        },
        subscriptionsEmail(context, data) {
            return subscriptionsEmail(data)
        },
        taskStatus(context, data) {
            return taskStatus(data)
        },
        getEssay(context, data) {
            return getEssay(data)
        },
        getEssayDetail(context, data) {
            return getEssayDetail(data)
        },
        setBind(context, data) {
            return setBind(data)
        },
        getInvitations(context, data) {
            return getInvitations(data)
        },
        getInvitationRank(context, data) {
            return getInvitationRank(data)
        },
        contractsQuery(context, data) {
            return contractsQuery(data)
        },
        contractsStatistics(context, data) {
            return contractsStatistics(data)
        },
        getInvitationCode(context, data) {
            return getInvitationCode(data)
        }


    }
};
