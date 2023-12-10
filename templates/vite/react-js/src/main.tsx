import React from "react";
import ReactDOM from "react-dom/client";
import "./display/styles/index.css";

import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { sepolia } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { App } from "./App";
import { QueryClient, QueryClientProvider } from "react-query";

export const activeChain = sepolia; // chain where app is currently reading data from
export const availableChains = [sepolia]; // chains to allow wallet connection

export const { publicClient } = configureChains(
  availableChains, // add chains here
  [
    /* add additional RPC providers here     
    jsonRpcProvider({
    rpc: () => ({
      http: "",
      }),
      alchemyProvider({apiKey: ""}),
    }), 
    */
    publicProvider(),
  ]
);

const config = createConfig(
  getDefaultConfig({
    appName: "My Web3 UI",
    chains: availableChains,
    walletConnectProjectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
  })
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const client = new QueryClient();

root.render(
  <React.StrictMode>
    <WagmiConfig config={config}>
      <ConnectKitProvider
        debugMode
        options={{
          walletConnectName: "WalletConnect",
          walletConnectCTA: "both",
          initialChainId: 1,
          enforceSupportedChains: false,
        }}
      >
        <QueryClientProvider client={client}>
          <App />
        </QueryClientProvider>
      </ConnectKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);
