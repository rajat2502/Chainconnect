import { useContext } from "react";
import { Typography } from "antd";

import { WalletContext } from "@/context/WalletContext";
import { Refresh } from "@/svgs/refresh";
import { DefaultMessage } from "@/components/ui/DefaultMessage";

import { TokenBalancesSkeleton } from "./TokenBalancesSkeleton";
import { TokenBalanceItem } from "./TokenBalanceItem";
import {
  tokenBalanceHeaderWrapperStyles,
  tokenBalanceWrapperStyles,
} from "./styles";

const { Title } = Typography;

export const TokenBalance = () => {
  const {
    account,
    tokenBalances,
    connectionStatus,
    isFetchingTokenBalances,
    currentNetwork,
    getTokenBalances,
  } = useContext(WalletContext);

  const handleRefreshTokenBalances = () => {
    if (currentNetwork) {
      getTokenBalances(currentNetwork);
    }
  };

  return (
    <div style={tokenBalanceWrapperStyles}>
      <div style={tokenBalanceHeaderWrapperStyles}>
        <Title level={4}>Your Token Balances</Title>
        <Refresh
          className={isFetchingTokenBalances ? "spin" : ""}
          style={{ cursor: account ? "pointer" : "not-allowed" }}
          onClick={handleRefreshTokenBalances}
        />
      </div>

      {connectionStatus === "disconnected" && (
        <DefaultMessage message='Please connect your wallet to view your token balances.' />
      )}

      {currentNetwork?.name === "UNSUPPORTED" && (
        <DefaultMessage message='Please connect to a supported network to view your token balances.' />
      )}

      {isFetchingTokenBalances && <TokenBalancesSkeleton />}

      {tokenBalances.length !== 0 && (
        <ul>
          {tokenBalances.map((tokenBalance, index) => (
            <TokenBalanceItem
              key={index}
              tokenBalance={tokenBalance}
              hasBorder={index !== tokenBalances.length - 1}
            />
          ))}
        </ul>
      )}
    </div>
  );
};
