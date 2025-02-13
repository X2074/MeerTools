
export const REMIX_URL = "https://remix.ethereum.org"
// 浏览器hash
export const QITMEER_HASH = "https://testnet-qng.qitmeer.io/tx/"
/**
 * w3m项目id
 * @type {string}
 */
export const W3M_PROJECT_ID = 'b0b51ca4619ee8217d0b75248e29c3ae'
/**
 * 可用网络的rpc信息
 */
export const QngTestnet = {
    id: 8131,
    name: 'Qitmeer Network Testnet',
    network: 'MEER',
    nativeCurrency: {
        decimals: 18,
        name: 'Qitmeer Testnet',
        symbol: 'MEER-T'
    },
    rpcUrls: {
        public: { http: ['https://testnet-qng.rpc.qitmeer.io'] },
        default: { http: ['https://testnet-qng.rpc.qitmeer.io'] }
    },
    blockExplorers: {
        etherscan: { name: 'Meerscan', url: 'https://testnet-qng.qitmeer.io/' },
        default: { name: 'Meerscan', url: 'https://testnet-qng.qitmeer.io/' }
    }
}
export const CHAINS = [QngTestnet]
/**
 * 默认链，测试阶段用 8131(qng testnet),生产阶段改为 813(qng mainnet)
 */
export const DEFAULT_CHAINID = 8131
/**
 * 默认的rpc，方便web3js使用，测试阶段用 https://testnet-qng.rpc.qitmeer.io,生产阶段改为 https://qng.rpc.qitmeer.io
 */
export const RPC = 'https://testnet-qng.rpc.qitmeer.io'

export const BROWSER_RPC = 'https://testnet-qng.qitmeer.io'
// export const RPC = 'https://qng.rpc.qitmeer.io'
// export const BROWSER_RPC = 'https://qng.meerscan.io'
