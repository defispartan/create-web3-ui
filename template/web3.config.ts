import { sepolia } from "wagmi/chains";
import { helloWorldAbi } from "./src/utilities/helloWorldAbi";
import * as availableChains from "wagmi/chains";
import { http } from "viem";
import { ContractConfig, Web3Config } from "./src/types";

// Mapping of chainId to deployed contracts
const contracts: Record<number, ContractConfig[]> = {
  11155111: [
    {
      address: "0x6d0f957FCA6bc98030068B603bF33E8E7AD6945c",
      abi: helloWorldAbi,
      name: "Hello World",
    },
  ],
};

const web3Config: Web3Config = {
  contracts,
  defaultChain: sepolia,
  availableChains: Object.values(availableChains),
  appProps: {
    walletConnectProjectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
    appName: "Your App Name",
    appDescription: "Your App Description",
    appUrl: "https://family.co", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  },
  transports: {
    [availableChains.mainnet.id]: http(
      `https://eth-mainnet.g.alchemy.com/v2/${import.meta.env.VITE_ALCHEMY_API_KEY}`
    ), // Will default to public provider for chain without transport defined
  },
} as const;

export default web3Config;
