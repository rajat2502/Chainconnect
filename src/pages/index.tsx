import Head from "next/head";

import { Header } from "@/components/Header";
import { TokenBalance } from "@/components/TokenBalance";
import { NetworkSelector } from "@/components/NetworkSelector";
import { TokenTransfer } from "@/components/TokenTransfer";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Head>
        <title>ChainConnect</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/assets/favicon.png' />
      </Head>
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Header />
          <div
            style={{
              display: "flex",
              gap: "32px",
              margin: "48px 120px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "24px",
                flex: 1,
              }}
            >
              <NetworkSelector />
              <TokenBalance />
            </div>
            <TokenTransfer />
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
