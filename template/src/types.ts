import { Transport } from "viem";
import { Chain } from "wagmi/chains";

export interface ContractConfig {
  address: `0x${string}`;
  abi: any;
  name: string;
}

export interface AppProps {
  walletConnectProjectId: string;
  appName: string;
  appDescription: string;
  appUrl: string;
  appIcon: string;
}

export interface Web3Config {
  availableChains: Chain[];
  defaultChain: Chain;
  contracts: Record<number, ContractConfig[]>;
  appProps: AppProps;
  transports: Record<number, Transport>;
}
