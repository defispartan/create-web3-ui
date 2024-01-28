import React from 'react'
import ReactDOM from 'react-dom/client'
import './display/styles/index.css'

import { ConnectKitProvider, getDefaultConfig } from 'connectkit'
import { WagmiConfig, configureChains, createConfig } from 'wagmi'

import { App } from './App.tsx'
import { QueryClient, QueryClientProvider } from 'react-query'
import web3Config from '../web3.config.ts'

export const { publicClient } = configureChains(web3Config.availableChains, web3Config.rpcProviders)

const config = createConfig(getDefaultConfig({ ...web3Config.appConfig, publicClient }))

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const client = new QueryClient()

root.render(
  <React.StrictMode>
    <WagmiConfig config={config}>
      <ConnectKitProvider
        debugMode
        options={{
          walletConnectName: 'WalletConnect',
          walletConnectCTA: 'both',
          initialChainId: web3Config.defaultChain.id,
          enforceSupportedChains: false,
        }}
      >
        <QueryClientProvider client={client}>
          <App />
        </QueryClientProvider>
      </ConnectKitProvider>
    </WagmiConfig>
  </React.StrictMode>
)
