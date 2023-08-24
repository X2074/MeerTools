import { Web3ReactHooks } from '@web3-react/core';
import { AddEthereumChainParameter , Connector } from "@web3-react/types";


export interface Connection {
    connector: Connector
    hooks: Web3ReactHooks
    type: ConnectionType
}

export enum ConnectionType {
    COINBASE_WALLET = 'COINBASE_WALLET',
    GNOSIS_SAFE = 'GNOSIS_SAFE',
    INJECTED = 'INJECTED',
    NETWORK = 'NETWORK',
    WALLET_CONNECT = 'WALLET_CONNECT'
}

export const PRIORITIZED_CONNECTORS: { [key in ConnectionType] : Connection} = {
    [ConnectionType.INJECTED]: buildInjectedConnector(),
    [ConnectionType.COINBASE_WALLET]: buildCoinbaseWalletConnector(),
    [ConnectionType.WALLET_CONNECT]: buildWalletConnectConnector(),
    [ConnectionType.GNOSIS_SAFE]: buildGnosisSafeConnector(),
    [ConnectionType.NETWORK]: buildNetworkConnector(),
}