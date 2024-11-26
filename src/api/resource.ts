import request from '@/utils/request'
import store from '@/store'
import { BROWSER_RPC } from '@/api/constant'
export const uploadImage = (data: any) => {
    return request({
        url: '/resources/image',
        method: 'post',
        headers: { 'Content-Type': 'multipart/form-data' },
        data
    })
}

export const uploadFile = (data: any) => {
    return request({
        url: '/resources/file',
        method: 'post',
        headers: { 'Content-Type': 'multipart/form-data' },
        data
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
// nft批量前置操作
export const generateNfts = (data: any) => {
    return request({
        url: '/nft/generate/batch',
        method: 'post',
        headers: { 'Content-Type': 'multipart/form-data' },
        data
    })
}
// prompt nft前置操作
export const generatePromptNfts = (data: any) => {
    return request({
        url: '/nft/prompt/generate',
        method: 'post',
        headers: { 'Content-Type': 'multipart/form-data' },
        data
    })
}
// 创建合集
/**
 * `address` (string) - 收藏集合的地址。
 * `name` (string) - 收藏集合的名称。
  * `description` (string) - 收藏集合的描述。 
 */
export const createCollections = (data: any) => {
    return request({
        url: '/collections',
        method: 'post',
        headers: { 'Content-Type': 'multipart/form-data' },
        data
    })
}
// 将NFT添加到收藏集合
/**
 - `collection_address` (string) - 收藏集合的地址。
  - `nft_id` (string) - NFT的唯一标识符。
  - `url` (string) - NFT的URL。 
 */
export const addNft = (data: any) => {
    return request({
        url: '/collections/add',
        method: 'post',
        headers: { 'Content-Type': 'multipart/form-data' },
        data
    })
}
// 无需鉴权获取指定收藏集合
/**
`address` (string) - 收藏集合的地址
 */
export const getCollectionList = (address: any) => {
    return request({
        url: '/public/collections/' + address,
        method: 'get'
    })
}
// 无需鉴权获取所有收藏集合
/**
`address` (string) - 收藏集合的地址
 */
export const getCollectionAll = () => {
    return request({
        url: '/public/collections?page=1&limit=10000',
        method: 'get',
    })
}
// 更新集合
/**
  - `address` (string) - 收藏集合的地址。
  - `name` (string, 可选) - 新的收藏集合名称。如果不需要更新，请不要包含此字段。
  - `description` (string, 可选) - 新的收藏集合描述。如果不需要更新，请不要包含此字段。
  - `cover_id` (string, 可选) - 新的封面图像标识符。如果不需要更新，请不要包含此字段。
 */
export const putCollection = (data) => {
    return request({
        url: '/collections',
        method: 'put',
        headers: { 'Content-Type': 'multipart/form-data' },
        data
    })
}
// 浏览器查询拥有的资产列表
export const getTokenlist = async () => {
    let userInfo = store.getters.userInfo;
    return request({
        url: BROWSER_RPC + '/api?module=account&action=tokenlist&address=' + userInfo.address,
        method: 'get'
    })
}
// 获取NFT集合列表
export const getNftslist = (data) => {
    return request({
        url: '/public/collections/check',
        method: 'post',
        headers: { 'Content-Type': 'multipart/form-data' },
        data
    })
}