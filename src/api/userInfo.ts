import request from '@/utils/request'
export const doVerify = (data:any) => {
  return request.post('/userprod/block/createBloc', data);
}
// huoqu
export const messages = (data:any) => {
    return request({
        method:'get',
        url:"/messages",
        params:data
    })
}
export const messagesDelete = (data:any) => {
    return request({
        method:'delete',
        url:"/messages",
        data
    })
}
export const messagesRead = (data:any) => {
    return request({
        method:'post',
        url:"/messages/read",
        data
    })
}
