import React, { useContext } from "react";
import Image from "next/image";
import { Button, Layout, Tag, Typography } from "antd";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";

import { WalletContext } from "@/context/WalletContext";
import { Disconnect } from "@/svgs/disconnect";
import { isDesktopScreen } from "@/utils/style";

import {
  connectedWrapperStyles,
  disconnectButtonStyles,
  headerLeftWrapperStyles,
  headerWrapperDesktopStyles,
  headerWrapperMobileStyles,
  headerWrapperStyles,
} from "./styles";

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
  const screens = useBreakpoint();

  const isDesktop = isDesktopScreen(screens);

  return (
    <AntdHeader
      style={
        isDesktop
          ? { ...headerWrapperStyles, ...headerWrapperDesktopStyles }
          : { ...headerWrapperStyles, ...headerWrapperMobileStyles }
      }
    >
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
          type='primary'
          loading={connectionStatus === "connecting"}
        >
          {connectionStatus === "connecting"
            ? "Connecting..."
            : "Connect Wallet"}
        </Button>
      )}
      {connectionStatus === "connected" && (
        <div style={connectedWrapperStyles}>
          {isDesktop && (
            <Text>
              {account?.slice(0, 8)}...{account?.slice(-6)}
            </Text>
          )}
          <Button
            onClick={disconnectWallet}
            variant='filled'
            color='danger'
            style={disconnectButtonStyles}
          >
            <Disconnect />
            {isDesktop && "Disconnect Wallet"}
          </Button>
        </div>
      )}
    </AntdHeader>
  );
};
