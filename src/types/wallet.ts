import type { TNetwork, TToken, TTokenBalance } from "./network";

export type TAccount = string | null;

export type TConnectionStatus = "connecting" | "connected" | "disconnected";

export type TTransactionStatus = "pending" | "success" | "error";

export type TUnrecognizedNetworkError = {
  code: number;
  message: string;
  stack: string;
};

export type TTransaction = {
  recipient: string;
  amount: string;
  token: TToken;
  network?: TNetwork;
};

export type TTransactionHistory = TTransaction & {
  hash: string;
};

export type TWalletContext = {
  account: TAccount;
  currentNetwork: TNetwork | null;
  connectionStatus: TConnectionStatus;
  supportedTokens: TToken[];
  tokenBalances: TTokenBalance[];
  isFetchingTokenBalances: boolean;
  transactionStatus: TTransactionStatus | null;
  transactionsHistory: TTransactionHistory[];
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  switchNetwork: (networkId: number) => Promise<void>;
  getTokenBalances: (network: TNetwork) => Promise<void>;
  sendTransaction: (transaction: TTransaction) => Promise<string | null>;
};
