const getters = {
    token: state => state.user.token,
    userInfo: state => state.user.userInfo,
    renewTimes: (state) => state.user.renewTimes,
    dim_balance: state => state.user.dim_balance
}
export default getters
