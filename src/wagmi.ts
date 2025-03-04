import { http, createConfig } from '@wagmi/core'
import { walletConnect, injected } from '@wagmi/vue/connectors'
import { W3M_PROJECT_ID } from '@/config/constants/constant'
import chains from '@/config/constants/chains.json'

let chainData: any = {
	chains: [chains['QngMainnet'], chains['QngTestnet']],
	connectors: [
		walletConnect({ projectId: W3M_PROJECT_ID, relayUrl: 'wss://relay.walletconnect.org', showQrModal: true, }),
		injected()
	],
	transports: {
		[chains['QngMainnet']['id']]: http(),
		[chains['QngTestnet']['id']]: http()
	}
}
export const config = createConfig(chainData)