import React from "react";
import ReactDOM from "react-dom/client";
import "./display/styles/index.css";
import { WagmiProvider, createConfig } from "wagmi";
import { Chain } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { App } from "./App";
import web3Config from "../web3.config";

export const wagmiConfig = createConfig(
  getDefaultConfig({
    chains: web3Config.availableChains as [Chain, ...Chain[]],
    transports: web3Config.transports,
    ...web3Config.appProps,
  })
);

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>
          <App />
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
