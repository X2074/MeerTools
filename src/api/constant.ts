// 浏览器hash
export const QITMEER_HASH = "https://testnet-qng.qitmeer.io/tx/"
// token
export const TOKEN = 'token'
// 时间戳
export const TIME_STAMP = 'timeStamp'
// 用户信息
export const USER_INFO = 'userInfo'
// 超时时长(毫秒) 6小时
export const TOKEN_TIMEOUT_VALUE = 1 * 3600 * 1000
/**
 * token 续期检查时间范围（默认30分钟，单位默认毫秒），在token即将过期的一段时间内用户操作了，则给用户的token续期
 */
export const TOKEN_DETECT_VALUE = 1800 * 1000
/**
 * 续期时间，默认 1小时，这里单位毫秒
 */
export const TOKEN_RENEW_VALUE = 3600 * 1000
/**
 * 续期时次数 key
 */
export const TOKEN_RENEW_TIKMES = 'renew'
// 国际化
export const LANG = 'language'
// 上次请求的地址
export const TARGET = 'target'

// 支持的语言种类
export const languageList = ['zh', 'en']
/**
 * w3m项目id
 * @type {string}
 */
export const W3M_PROJECT_ID = '57906c2a53779d0eeed9b515095f6d3b'
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
/**
 * 用户DIM余额
 */
export const DIM_BALANCE = 'dim_balance'

export const BROWSER_RPC = 'https://testnet-qng.qitmeer.io'
// export const RPC = 'https://qng.rpc.qitmeer.io'
// export const BROWSER_RPC = 'https://qng.meerscan.io'

/**
 * 反提示词
 */
export const ANTI = 'mutated hands and fingers, deformed, bad anatomy, disfigured, poorly drawn face, mutated, extra limb, ugly, poorly drawn hands, missing limb, floating limbs, disconnected limbs, malformed hands, out of focus, long neck, long body, naked'
/**
 * 用户头像的前置url，如果用户有头像的话，使用BASE_AVATAR_URl拼接钱包地址即可获取到用户头像（需要去掉0x）。例如：用户钱包地址是0xbfd86cc5c6fe5caffc394c0b50188e16bde660a7，对应的头像地址为："https://dimaiuseravatar.s3.ap-southeast-1.amazonaws.com/bfd86cc5c6fe5caffc394c0b50188e16bde660a7"
 */
export const BASE_AVATAR_URl = 'https://dimaiuseravatar.s3.ap-southeast-1.amazonaws.com/'

// 分享功能生成二维码使用的url
export const BASE_CODE_URl = 'https://test1.dimai.io'

// 活动合集配置数据
export const ACTIVITY_COLLECTION_CONFIGURATION = [
    {
        address: '0xa7EB170870245bfB5Ee165D7Fa09d62DfeD93044',
        matching: '0xfe0558FaF8DdFE48eaeE1d4Ca799c14d3A0A15EA',
        name: {
            zh: '情人节 NFT 活动',
            en: 'V-Day NFT Event',
            bul: "Колекция от гениални творения",//保加利亚语
            cht: "情人節 NFT 活動",//繁体中文
            de: "Valentine's Day NFT-Event",//德语
            fra: "Événement NFT de la Saint-Valentin",//法语
            it: "Evento NFT di San Valentino",//意大利语
            jp: " バレンタインデーNFTイベント",//日语
            kor: "발렌타인데이 NFT 이벤트",//韩语
            nl: "Valentijnsdag NFT-evenement",//荷兰语
            pl: "Wydarzenie NFT z okazji Walentynek",//波兰语
            pt: "Evento NFT do Dia dos Namorados",//葡萄牙语
            rom: "Evenimentul NFT de Ziua Îndrăgostiților",//罗马尼亚语
            ru: "Событие NFT ко Дню святого Валентина",//俄语
            spa: "Evento NFT del Día de San Valentín",//西班牙语
            tk: "Sevgililer Günü NFT Etkinliği",//土耳其语
            yd: "वैलेंटाइन्स डे एनएफटी इवेंट",//印地语 
        },
        isActive: false,
        price: 300,
        unit: 'DIM',
        src: "/images/gallery/v-day.jpg"
    }
]
