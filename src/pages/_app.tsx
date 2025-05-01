import type { AppProps } from "next/app";
import { ConfigProvider, type ThemeConfig } from "antd";

import { WalletProvider } from "@/context/WalletContext";
import "@/styles/globals.css";

const theme: ThemeConfig = {
  token: {
    colorPrimary: "#9333ea",
    colorPrimaryHover: "#581c87e6",
    colorPrimaryActive: "#581c87e6",
  },
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider theme={theme}>
      <WalletProvider>
        <Component {...pageProps} />
      </WalletProvider>
    </ConfigProvider>
  );
}
