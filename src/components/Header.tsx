import React, { useContext } from "react";
import Image from "next/image";
import { Button, Layout, Tag, Typography } from "antd";

import { Disconnect } from "@/svgs/disconnect";
import { WalletContext } from "@/context/WalletContext";

const { Header: AntdHeader } = Layout;
const { Text } = Typography;

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
        padding: "0 120px",
        backgroundColor: "white",
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-end", gap: "12px" }}>
        <Image
          src='/assets/logo.png'
          alt='ChainConnect'
          width={128}
          height={42}
          quality={100}
        />
        {currentNetwork && <Tag color='purple'>{currentNetwork?.name}</Tag>}
      </div>

      {(connectionStatus === "disconnected" ||
        connectionStatus === "connecting") && (
        <Button
          onClick={connectWallet}
          type='primary'
          loading={connectionStatus === "connecting"}
        >
          {connectionStatus === "connecting"
            ? "Connecting..."
            : "Connect Wallet"}
        </Button>
      )}
      {connectionStatus === "connected" && (
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Text>
            {account?.slice(0, 8)}...{account?.slice(-6)}
          </Text>
          <Button
            onClick={disconnectWallet}
            variant='filled'
            color='danger'
            style={{ gap: "4px" }}
          >
            <Disconnect />
            Disconnect Wallet
          </Button>
        </div>
      )}
    </AntdHeader>
  );
};
