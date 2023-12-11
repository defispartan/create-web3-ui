import { Chain, ChainProviderFn } from 'wagmi';

// Should be changed to only app-required chains e.g. import { mainnet, polygon } from "wagmi/chains"
import * as allChains from "wagmi/chains";

import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { infuraProvider } from "wagmi/providers/infura";
import { helloWorldAbi } from './src/utilities/helloWorldAbi';

interface AppProps {
    appName: string;
    appIcon?: string;
    appDescription?: string;
    appUrl?: string;
    autoConnect?: boolean;
    alchemyId?: string;
    infuraId?: string;
    chains?: Chain[];
    connectors?: any;
    publicClient?: any;
    webSocketPublicClient?: any;
    enableWebSocketPublicClient?: boolean;
    stallTimeout?: number;
    walletConnectProjectId: string;
}

export interface ContractConfig {
    address: `0x${string}`;
    abi: any;
    name: string;
}

interface Web3Config {
    availableChains: Chain[];
    defaultChain: Chain;
    rpcProviders: ChainProviderFn<Chain>[];
    appConfig: AppProps;
    contracts: Record<number, ContractConfig[]>
}

const rpcProviders: ChainProviderFn<Chain>[] = [publicProvider()];

const alchemyKey: string | undefined = import.meta.env.VITE_ALCHEMY_API_KEY;
const infuraKey: string | undefined = import.meta.env.VITE_INFURA_API_KEY;
if (alchemyKey) {
    rpcProviders.push(alchemyProvider({ apiKey: alchemyKey }));
}
if (infuraKey) {
    rpcProviders.push(infuraProvider({ apiKey: infuraKey }));
}

/* 
To add custom RPC providers, push to rpcProviders array:

jsonRpcProvider({
  rpc: () => ({
    http: "",
    webSocket: "",
  }),
}),
*/

// App configuration
const availableChains: Chain[] = Object.values(allChains);
const defaultChain: Chain = allChains.sepolia;
const appConfig: AppProps = {
    appName: "My Web3 UI",
    chains: availableChains,
    walletConnectProjectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
}

// Mapping of chainId to deployed contracts
const contracts: Record<number, ContractConfig[]> = {
    11155111: [{
        address: '0x6d0f957FCA6bc98030068B603bF33E8E7AD6945c',
        abi: helloWorldAbi,
        name: "Hello World"
    }],
}

const web3Config: Web3Config = {
    availableChains,
    defaultChain,
    rpcProviders,
    appConfig,
    contracts
} as const;

export default web3Config;