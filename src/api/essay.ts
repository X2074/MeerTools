import request from '@/utils/request'
import store from '@/store'
// 获取文章列表
export const getEssay = (data) => {
    return request({
        url: '/article/overview',
        method: 'get',
        headers: { 'Content-Type': 'multipart/form-data' },
        params: data
    })
}
// 获取文章详情
export const getEssayDetail = (id: any) => {
    return request({
        url: '/article/' + id,
        method: 'get'
    })
}