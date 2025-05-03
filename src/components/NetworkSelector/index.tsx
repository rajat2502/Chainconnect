import { useContext } from "react";
import { Button } from "antd";

import { WalletContext } from "@/context/WalletContext";
import { SUPPORTED_NETWORKS } from "@/constants/network";

import { networkDotStyles, networkSelectorWrapperStyles } from "./styles";

export const NetworkSelector = () => {
  const { currentNetwork, connectionStatus, switchNetwork } =
    useContext(WalletContext);

  if (!currentNetwork) return null;
  return (
    <div style={networkSelectorWrapperStyles}>
      {SUPPORTED_NETWORKS.map((network) => {
        const isCurrentNetwork = currentNetwork?.id === network.id;
        return (
          <Button
            type={isCurrentNetwork ? "default" : "text"}
            key={network.id}
            onClick={() => switchNetwork(network.id)}
            disabled={connectionStatus === "connecting"}
          >
            {!isCurrentNetwork && (
              <div
                style={{
                  ...networkDotStyles,
                  backgroundColor: network.colorCode,
                }}
              />
            )}
            {network.name}
          </Button>
        );
      })}
    </div>
  );
};
