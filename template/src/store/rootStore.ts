import { create } from "zustand";
import { wagmiConfig } from "../main.tsx";
import web3Config from "../../web3.config.ts";
import { GetPublicClientReturnType, getPublicClient } from "wagmi/actions";
import { Chain } from "wagmi/chains";
import { ContractConfig } from "../types.ts";

interface StoreState {
  availableChains: Chain[];
  activeChain: Chain;
  setActiveChain: (chain: Chain) => void;
  activeChainClient: GetPublicClientReturnType;
  activeChainContracts: ContractConfig[];
}

const useRootStore = create<StoreState>((set) => ({
  activeChain: web3Config.defaultChain,
  activeChainClient: getPublicClient(wagmiConfig, {
    chainId: web3Config.defaultChain.id,
  }),
  activeChainContracts: web3Config.contracts[web3Config.defaultChain.id] || [],
  availableChains: web3Config.availableChains,
  setActiveChain: (chain: Chain) => {
    set(() => ({ activeChain: chain }));
    set(() => ({
      activeChainClient: getPublicClient(wagmiConfig, { chainId: chain.id }),
    }));
    set(() => ({ activeChainContracts: web3Config.contracts[chain.id] || [] }));
  },
}));

export default useRootStore;
