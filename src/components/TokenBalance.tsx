import { useContext } from "react";
import { Typography } from "antd";

import { WalletContext } from "@/context/WalletContext";
import { Refresh } from "@/svgs/refresh";
import type { TTokenBalance } from "@/types/network";

const { Title, Text } = Typography;

export const TokenBalance = () => {
  const {
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
    <div
      style={{
        padding: "24px",
        border: "1px solid #e0e0e0",
        borderRadius: "12px",
        minHeight: "120px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Title level={4}>Your Token Balances</Title>
        <Refresh
          className={isFetchingTokenBalances ? "spin" : ""}
          style={{ cursor: "pointer" }}
          onClick={handleRefreshTokenBalances}
        />
      </div>
      {connectionStatus === "disconnected" && (
        <Text>Please connect your wallet to view your token balances</Text>
      )}
      {isFetchingTokenBalances && <Text>Fetching token balances...</Text>}
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

const TokenBalanceItem = ({
  tokenBalance,
  hasBorder,
}: {
  tokenBalance: TTokenBalance;
  hasBorder: boolean;
}) => {
  return (
    <li
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 0",
        borderBottom: hasBorder ? "1px solid #e0e0e0" : "none",
      }}
      key={tokenBalance.token.symbol}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        {tokenBalance.token.logo && (
          <tokenBalance.token.logo style={{ width: "48", height: "48" }} />
        )}
        <Text style={{ fontSize: "16px", fontWeight: "bold" }}>
          {tokenBalance.token.name}
        </Text>
      </div>
      <div>
        <Text>
          {tokenBalance.formattedBalance} {tokenBalance.token.symbol}
        </Text>
      </div>
    </li>
  );
};
