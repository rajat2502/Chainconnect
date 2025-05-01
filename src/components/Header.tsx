import React, { useContext } from "react";
import Link from "next/link";
import { Button, Layout, Typography } from "antd";

import { WalletContext } from "@/context/WalletContext";

const { Header: AntdHeader } = Layout;

export const Header = () => {
  const {
    account,
    currentNetwork,
    connectionStatus,
    connectWallet,
    disconnectWallet,
  } = useContext(WalletContext);

  return (
    <AntdHeader
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 24px",
        backgroundColor: "white",
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <Typography.Title level={3}>
          <Link href='/'>Multi-Chain Wallet</Link>
        </Typography.Title>
        {currentNetwork && (
          <Typography.Text>{currentNetwork?.name}</Typography.Text>
        )}
      </div>

      {connectionStatus === "disconnected" && (
        <Button onClick={connectWallet} type='primary'>
          Connect Wallet
        </Button>
      )}
      {connectionStatus === "connected" && (
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Typography.Text>
            {account?.slice(0, 8)}...{account?.slice(-6)}
          </Typography.Text>
          <Button onClick={disconnectWallet} type='primary'>
            Disconnect Wallet
          </Button>
        </div>
      )}
    </AntdHeader>
  );
};
