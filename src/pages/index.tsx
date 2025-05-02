import Head from "next/head";

import { Header } from "@/components/Header";
import { TokenBalance } from "@/components/TokenBalance";
import { NetworkSelector } from "@/components/NetworkSelector";
import { TokenTransfer } from "@/components/TokenTransfer";

export default function Home() {
  return (
    <>
      <Head>
        <title>Multi-Chain Wallet</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <Header />
        <div
          style={{
            display: "flex",
            gap: "16px",
            margin: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              flex: 1,
            }}
          >
            <NetworkSelector />
            <TokenBalance />
          </div>
          <TokenTransfer />
        </div>
      </main>
    </>
  );
}
