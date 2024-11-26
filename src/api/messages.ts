import request from '@/utils/request'

// 获取消息列表
export const getMessages = (data: any) => {
    return request({
        url: '/messages',
        method: 'get',
        params: data
    })
}
// 获取消息详情
export const getMessageDetail = (id: any) => {
    return request({
        url: '/message/' + id,
        method: 'get'
    })
}
// 标记消息已读
export const messageReaded = (data: any) => {
    return request({
        url: '/message/read',
        method: 'post',
        data
    })
}
// 删除消息
export const messageDeleted = (data: any) => {
    return request({
        url: '/message/delete',
        method: 'post',
        data
    })
}