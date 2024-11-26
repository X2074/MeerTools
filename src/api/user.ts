import request from '@/utils/request'

export const login = (data) => {
    return request({
        url: '/login',
        method: 'post',
        data
    })
}

export const getHotWords = () => {
    return request({
        url: '/hotword',
        method: 'get'
    })
}
export const getGallerys = () => {
    return request({
        url: '/gallerys?page=1&limit=10',
        method: 'get'
    })
}
export const getTasks = () => {
    return request({
        url: '/tasks',
        method: 'get'
    })
}
export const getTaskByToken = (taskToken) => {
    return request({
        url: '/task/' + taskToken,
        method: 'get'
    })
}
export const drawWx = (data) => {
    return request({
        url: '/draw/txt2img',
        method: 'post',
        data
    })
}
export const getImgs = (data) => {
    return request({
        url: '/imgs',
        method: 'get',
        params: data
    })
}
//将图片添加到主题
export const addImgToTheme = (data) => {
    return request({
        url: '/theme',
        method: 'post',
        data
    })
}
//获取主题图片
export const getThemeImgs = (data) => {
    return request({
        url: '/theme',
        method: 'get',
        params: data
    })
}
//获取用户信息
export const getUserInfo = () => {
    return request({
        url: '/info',
        method: 'get'
    })
}
//更新用户昵称
export const updateUserNickname = (name) => {
    return request({
        url: '/name',
        method: 'post',
        data: {
            name: name
        }
    })
}
//更新用户头像
export const updateAvatar = (data) => {
    return request({
        url: '/avatar',
        method: 'post',
        headers: { 'Content-Type': 'multipart/form-data' },
        data
    })
}
//根据TaskToken获取用户图片
export const getImgsWithTaskToken = (taskToken) => {
    return request({
        url: '/imgs/' + taskToken,
        method: 'get'
    })
}
// nft前置操作
export const generateNft = (data: any) => {
    return request({
        url: '/nft/generate',
        method: 'post',
        headers: { 'Content-Type': 'multipart/form-data' },
        data
    })
}
//添加创意空间图片
export const addImgToCreativeSpaces = (data) => {
    return request({
        url: '/creative-spaces/imgs',
        method: 'post',
        data
    })
}
//获取创意空间图片
export const getCreativeSpacesImgs = (data) => {
    return request({
        url: '/creative-spaces/social_imgs',
        method: 'get',
        params: data
    })
}
//删除创意空间图片
export const deleteImgFromCreativeSpaces = (data) => {
    return request({
        url: '/creative-spaces/delete-imgs',
        method: 'post',
        data
    })
}
//获取按点赞数量排名的创意空间图片
export const getSocialImgs = (data) => {
    return request({
        url: '/creative-spaces/social-imgs/rank',
        method: 'get',
        params: data
    })
}
//点赞图片
export const likeImg = (data) => {
    return request({
        url: '/img/like',
        method: 'post',
        data
    })
}
//取消点赞图片
export const cancelLikeImg = (data) => {
    return request({
        url: '/img/unlike',
        method: 'post',
        data
    })
}
//通过base64图片创建绘图任务
export const drawLtImg2ImgByImg = (data) => {
    return request({
        url: '/draw/img2img/raw',
        method: 'post',
        data
    })
}
//批量添加主题图片
export const addImgsToTheme = (data) => {
    return request({
        url: '/theme/add-imgs',
        method: 'post',
        data
    })
}
//批量删除主题图片
export const deleteImgsFromTheme = (data) => {
    return request({
        url: '/theme/delete-imgs',
        method: 'post',
        data
    })
}
//批量删除用户自己的图片
export const deleteImgs = (data) => {
    return request({
        url: '/imgs/delete',
        method: 'post',
        data
    })
}
//根据钱包地址查询用户信息
export const getUserinfoByAddress = (address) => {
    return request({
        url: '/user-info/' + address,
        method: 'get'
    })
}

//免费绘画
export const freeDraw = (data) => {
    return request({
        url: '/crypto/v1/free/draw',
        method: 'post',
        data
    })
}

//免费绘画
export const freeMint = (data) => {
    return request({
        url: '/crypto/v1/free/mint',
        method: 'post',
        data
    })
}

// 无需登录添加邮箱订阅
export const subscriptionsEmail = (data) => {
    return request({
        url: '/public/subscriptions/emails',
        method: 'post',
        data
    })
}
// 查询ai绘图权限
export const taskStatus = () => {
    return request({
        url: '/task/status',
        method: 'get'
    })
}