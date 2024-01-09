import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "./index.css";
import CurrencyProvider from "./context/CurrencyContext.jsx";

import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";

import { WagmiConfig } from "wagmi";
import { mainnet } from "viem/chains";

const projectId = "eb0c400848a78eb423d49e0fbbf77b12";

const chains = [mainnet];

const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata: {
    name: "test",
  },
});

createWeb3Modal({ wagmiConfig, projectId, chains });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CurrencyProvider>
      <WagmiConfig config={wagmiConfig}>
        <App />
      </WagmiConfig>
    </CurrencyProvider>
  </React.StrictMode>
);
