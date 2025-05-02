import { useContext } from "react";
import { Button } from "antd";

import { WalletContext } from "@/context/WalletContext";
import { SUPPORTED_NETWORKS } from "@/constants/network";

export const NetworkSelector = () => {
  const { currentNetwork, connectionStatus, switchNetwork } =
    useContext(WalletContext);

  if (!currentNetwork) return null;
  return (
    <div style={{ display: "flex", gap: "12px" }}>
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
                  width: "12px",
                  height: "12px",
                  backgroundColor: network.colorCode,
                  borderRadius: "50%",
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
