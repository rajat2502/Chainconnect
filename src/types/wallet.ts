import type { TNetwork, TToken, TTokenBalance } from "./network";

export type TAccount = string | null;

export type TConnectionStatus = "connected" | "disconnected" | "connecting";

export type TUnrecognizedNetworkError = {
  code: number;
  message: string;
  stack: string;
};

export type TWalletContext = {
  account: TAccount;
  currentNetwork: TNetwork | null;
  connectionStatus: TConnectionStatus;
  supportedTokens: TToken[];
  tokenBalances: TTokenBalance[];
  isFetchingTokenBalances: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  switchNetwork: (networkId: number) => Promise<void>;
  getTokenBalances: () => Promise<void>;
};
