import type { AppProps } from "next/app";
import { ConfigProvider } from "antd";

import { WalletProvider } from "@/context/WalletContext";
import { theme } from "@/config/theme";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider theme={theme}>
      <WalletProvider>
        <Component {...pageProps} />
      </WalletProvider>
    </ConfigProvider>
  );
}
