import { create } from 'zustand'
import { Chain, PublicClient } from 'wagmi'
import { publicClient } from '../main.tsx'
import web3Config, { ContractConfig } from '../../web3.config.ts'

interface StoreState {
  availableChains: Chain[]
  activeChain: Chain
  setActiveChain: (chain: Chain) => void
  activeChainClient: PublicClient
  activeChainContracts: ContractConfig[]
}

const useRootStore = create<StoreState>((set) => ({
  availableChains: web3Config.availableChains,
  activeChain: web3Config.defaultChain,
  activeChainClient: publicClient({ chainId: web3Config.defaultChain.id }),
  activeChainContracts: web3Config.contracts[web3Config.defaultChain.id] || [],
  setActiveChain: (chain: Chain) => {
    set(() => ({ activeChain: chain }))
    set(() => ({ activeChainClient: publicClient({ chainId: chain.id }) }))
    set(() => ({ activeChainContracts: web3Config.contracts[chain.id] || [] }))
  },
}))

export default useRootStore
