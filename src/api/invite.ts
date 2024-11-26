import request from '@/utils/request'
// 绑定用户
export const setBind = (data) => {
    return request({
        url: '/invitation/bind',
        method: 'post',
        data
    })
}
// 获取用户邀请记录
export const getInvitations = (data) => {
    return request({
        url: '/invitations',
        method: 'get',
        params: data
    })
}
// 获取用户邀请记录
export const getInvitationRank = (data) => {
    return request({
        url: '/invitation/rank',
        method: 'get',
        params: data
    })
}
// 获取被邀请的充值记录/充值详情根据参数的不同，查询不同的结果
export const contractsQuery = (data) => {
    return request({
        url: '/offchaindata/contracts/events/query',
        method: 'post',
        data
    })
}

// 查询单个用户购买总金额/查询单个用户带给邀请人的总收益
export const contractsStatistics = (data) => {
    return request({
        url: '/offchaindata/contracts/events/statistics',
        method: 'post',
        data
    })
}
// 邀请码查询用户信息
export const getInvitationCode = (invitation_code: any) => {
    return request({
        url: '/public/users/info/' + invitation_code,
        method: 'get'
    })
}