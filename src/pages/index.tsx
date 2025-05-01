import Head from "next/head";

import { Header } from "@/components/Header";
import { TokenBalance } from "@/components/TokenBalance";
import { NetworkSelector } from "@/components/NetworkSelector";

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
            flexDirection: "column",
            gap: "16px",
            margin: "24px",
          }}
        >
          <NetworkSelector />
          <TokenBalance />
        </div>
      </main>
      <footer></footer>
    </>
  );
}
