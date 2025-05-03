import React, { useContext } from "react";
import Image from "next/image";
import { Button, Tag, Typography } from "antd";

import { WalletContext } from "@/context/WalletContext";
import { Disconnect } from "@/svgs/disconnect";

import {
  connectedWrapperStyles,
  disconnectButtonStyles,
  headerLeftWrapperStyles,
  headerWrapperStyles,
} from "./styles";

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
    <div className='header-wrapper' style={headerWrapperStyles}>
      <div style={headerLeftWrapperStyles}>
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
          color='purple'
          variant='filled'
          loading={connectionStatus === "connecting"}
        >
          {connectionStatus === "connecting"
            ? "Connecting..."
            : "Connect Wallet"}
        </Button>
      )}
      {connectionStatus === "connected" && (
        <div style={connectedWrapperStyles}>
          <Text className='mobile-display-none'>
            {account?.slice(0, 8)}...{account?.slice(-6)}
          </Text>
          <Button
            onClick={disconnectWallet}
            variant='filled'
            color='danger'
            style={disconnectButtonStyles}
          >
            <Disconnect />
            <span className='mobile-display-none'>Disconnect Wallet</span>
          </Button>
        </div>
      )}
    </div>
  );
};
