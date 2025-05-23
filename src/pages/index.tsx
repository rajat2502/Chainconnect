import Head from "next/head";

import { Header } from "@/components/Header";
import { MainWrapper } from "@/components/ui/MainWrapper";
import { DashboardWrapper } from "@/components/ui/DashboardWrapper";
import { DashboardLeftWrapper } from "@/components/ui/DashboardLeftWrapper";
import { NetworkSelector } from "@/components/NetworkSelector";
import { TokenBalance } from "@/components/TokenBalance";
import { TokenTransfer } from "@/components/TokenTransfer";
import { TransactionHistory } from "@/components/TransactionHistory";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Head>
        <title>ChainConnect</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta
          name='description'
          content='ChainConnect is a platform for connecting to different blockchains.'
        />
        <link rel='icon' href='/assets/favicon.png' />
      </Head>
      <MainWrapper>
        <Header />
        <DashboardWrapper>
          <DashboardLeftWrapper>
            <NetworkSelector />
            <TokenBalance />
          </DashboardLeftWrapper>
          <TokenTransfer />
          <TransactionHistory />
        </DashboardWrapper>
        <Footer />
      </MainWrapper>
    </>
  );
}
