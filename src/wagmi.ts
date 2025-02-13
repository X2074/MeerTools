import { http, createConfig } from '@wagmi/core'
import { walletConnect, injected } from '@wagmi/vue/connectors'
import { CHAINS, DEFAULT_CHAINID, W3M_PROJECT_ID } from '@/config/constants/constant'

export const config = createConfig({
	chains: CHAINS,
	connectors: [
		walletConnect({ projectId: W3M_PROJECT_ID }),
		injected()
	],
	transports: {
		[DEFAULT_CHAINID]: http()
	}
})