import { useContext } from "react";
import { Typography } from "antd";

import { WalletContext } from "@/context/WalletContext";

const { Title, Text } = Typography;

export const TokenBalance = () => {
  const { tokenBalances, connectionStatus, isFetchingTokenBalances } =
    useContext(WalletContext);

  return (
    <div
      style={{
        padding: "24px",
        border: "1px solid #e0e0e0",
        borderRadius: "12px",
        minHeight: "120px",
      }}
    >
      {connectionStatus === "disconnected" && (
        <Text>Please connect your wallet to view your token balances</Text>
      )}
      {isFetchingTokenBalances && <Text>Fetching token balances...</Text>}
      {tokenBalances.length !== 0 && (
        <>
          <Title level={4}>Your Token Balances:</Title>
          {tokenBalances.map((tokenBalance) => (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              key={tokenBalance.token.symbol}
            >
              <Text>{tokenBalance.token.name}</Text>
              <div>
                <Text>
                  {tokenBalance.formattedBalance} {tokenBalance.token.symbol}
                </Text>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};
