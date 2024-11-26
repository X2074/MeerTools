import request from '@/utils/request'
import axios from "axios";
// 通过Prompt ID创建文本转图片任务
export const drawPrompt_id = (data: any) => {
    return request({
        url: '/draw/txt2img/prompt_id',
        method: 'post',
        data
    })
}
// 获取可用 Prompt NFT 列表
export const getPrompts = (data: any) => {
    return request({
        url: '/nft/prompt/available',
        method: 'get',
        params: data
    })
}
// 获取可用 Prompt NFT 详情
export const getPromptDetail = (id: any) => {
    return request({
        url: '/nft/prompt/' + id,
        method: 'get'
    })
}
// 获取单个NFT受欢迎程度、是否可以mint
export const getPromptPopularity = (id: any) => {
    return request({
        url: '/nft/popularity/' + id,
        method: 'get'
    })
}
// 获取所有NFT受欢迎程度信息
export const getPromptPopularityAll = (id: any) => {
    return request({
        url: '/nft/popularity/all',
        method: 'get'
    })
}
// 设置NFT为感兴趣状态
export const setPromptWanted = (id: any) => {
    return request({
        url: '/nft/popularity/like/' + id,
        method: 'put'
    })
}
// 取消对NFT的感兴趣状态
export const promptWantedCancel = (id: any) => {
    return request({
        url: '/nft/popularity/like/cancel/' + id,
        method: 'put'
    })
}
// 更新NFT的参考许可状态 -- 是否可以引用
export const changeReference = (id: any, data) => {
    return request({
        url: '/nft/popularity/reference/' + id,
        method: 'patch',
        data
    })
}