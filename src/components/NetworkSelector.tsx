import { useContext } from "react";
import { Button } from "antd";

import { WalletContext } from "@/context/WalletContext";
import { SUPPORTED_NETWORKS } from "@/constants/network";

export const NetworkSelector = () => {
  const { currentNetwork, connectionStatus, switchNetwork } =
    useContext(WalletContext);

  return (
    <div style={{ display: "flex", gap: "16px" }}>
      {SUPPORTED_NETWORKS.map((network) => (
        <Button
          type={currentNetwork?.id === network.id ? "primary" : "default"}
          key={network.id}
          onClick={() => switchNetwork(network.id)}
          disabled={connectionStatus === "connecting"}
        >
          {network.name}
        </Button>
      ))}
    </div>
  );
};
