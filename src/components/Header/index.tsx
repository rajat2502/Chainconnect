import React, { useContext } from "react";
import Image from "next/image";
import { Button, message, Tag, Typography } from "antd";

import { WalletContext } from "@/context/WalletContext";
import { OpenInNew } from "@/svgs/openInNew";
import { Disconnect } from "@/svgs/disconnect";

import {
  connectedWrapperStyles,
  copyAddressStyles,
  disconnectButtonStyles,
  headerLeftWrapperStyles,
  headerWrapperStyles,
  openInNewStyles,
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

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(account!);
    message.success("Address copied to clipboard");
  };

  const handleOpenExplorer = () => {
    window.open(`${currentNetwork?.explorerUrl}/address/${account}`, "_blank");
  };

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
            <span
              title='Copy Address'
              onClick={handleCopyAddress}
              style={copyAddressStyles}
            >
              {account?.slice(0, 8)}...{account?.slice(-6)}
            </span>
            <span title='Open in Explorer'>
              <OpenInNew style={openInNewStyles} onClick={handleOpenExplorer} />
            </span>
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
