import { createContext, useEffect, useState, useCallback } from "react";
import { notification } from "antd";

import {
  getChainIdFromNetworkId,
  getNetworkIdFromChainId,
  getNetworkFromNetworkId,
  getTokensForNetwork,
} from "@/utils/network";
import {
  ETHEREUM_REQUEST_METHODS,
  UNRECOGNIZED_NETWORK_ERROR_CODE,
} from "@/constants";

import {
  addNetworkToMetaMask,
  getAccountsFromMetamask,
  getNativeTokenBalance,
  getUSDCBalance,
  switchNetworkOnMetamask,
} from "@/utils/ethereum";
import { sendTransaction as sendTransactionEthers } from "@/utils/ethers";
import {
  setItemFromLocalStorage,
  getItemFromLocalStorage,
  removeItemFromLocalStorage,
} from "@/utils/storage";
import type {
  TAccount,
  TConnectionStatus,
  TTransaction,
  TTransactionHistory,
  TTransactionStatus,
  TUnrecognizedNetworkError,
  TWalletContext,
} from "@/types/wallet";
import type { TNetwork, TToken, TTokenBalance } from "@/types/network";

const defaultWalletContext: TWalletContext = {
  account: null,
  currentNetwork: null,
  connectionStatus: "disconnected",
  supportedTokens: [],
  tokenBalances: [],
  isFetchingTokenBalances: false,
  transactionStatus: null,
  transactionsHistory: [],
  connectWallet: async () => {},
  disconnectWallet: () => {},
  switchNetwork: async () => {},
  getTokenBalances: async () => {},
  sendTransaction: async () => null,
};

export const WalletContext =
  createContext<TWalletContext>(defaultWalletContext);

type TWalletProviderProps = {
  children: React.ReactNode;
};

export const WalletProvider = ({ children }: TWalletProviderProps) => {
  const [connectionStatus, setConnectionStatus] =
    useState<TConnectionStatus>("disconnected");
  const [account, setAccount] = useState<TAccount>(null);
  const [currentNetwork, setCurrentNetwork] = useState<TNetwork | null>(null);
  const [supportedTokens, setSupportedTokens] = useState<TToken[]>([]);
  const [tokenBalances, setTokenBalances] = useState<TTokenBalance[]>([]);
  const [isFetchingTokenBalances, setIsFetchingTokenBalances] = useState(false);
  const [transactionStatus, setTransactionStatus] =
    useState<TTransactionStatus | null>(null);
  const [transactionsHistory, setTransactionsHistory] = useState<
    TTransactionHistory[]
  >([]);

  const isMetaMaskInstalled =
    typeof window !== "undefined" && window.ethereum !== undefined;

  const handleAccountChange = useCallback((accounts: TAccount[]) => {
    setAccount(accounts?.[0] || null);
  }, []);

  const fetchTokenBalance = useCallback(
    async (network: TNetwork) => {
      if (!isMetaMaskInstalled || !account || !network) return;

      try {
        setIsFetchingTokenBalances(true);
        setTokenBalances([]);
        const tokens = getTokensForNetwork(network);
        const balances: TTokenBalance[] = [];

        for (const token of tokens) {
          let balance: TTokenBalance;

          if (token.isNative) {
            balance = await getNativeTokenBalance({ account, token });
          } else {
            balance = (await getUSDCBalance({
              account,
              network,
              token,
            })) as TTokenBalance;
          }
          balances.push(balance);
        }
        setTokenBalances(balances);
      } catch (error) {
        notification.open({
          message: "Error fetching token balances",
          description: (error as Error).message,
          type: "error",
        });
      } finally {
        setIsFetchingTokenBalances(false);
      }
    },
    [account, isMetaMaskInstalled]
  );

  const handleChainChange = useCallback(
    (chainId: string) => {
      const networkId = getNetworkIdFromChainId(chainId);
      const network = getNetworkFromNetworkId(networkId);

      if (network.name === "UNSUPPORTED") {
        setCurrentNetwork(network);
        setSupportedTokens([]);
        setTokenBalances([]);
        return;
      }

      setCurrentNetwork(network);
      setSupportedTokens(getTokensForNetwork(network as TNetwork));
      setTokenBalances([]);
      fetchTokenBalance(network as TNetwork);
    },
    [fetchTokenBalance]
  );

  const handleDisconnect = useCallback(() => {
    setAccount(null);
    setCurrentNetwork(null);
    setConnectionStatus("disconnected");
    setTokenBalances([]);
    setItemFromLocalStorage("manuallyDisconnected", "true");
  }, []);

  const handleAddNetwork = async (network: TNetwork) => {
    try {
      const chainId = getChainIdFromNetworkId(network.id);
      await addNetworkToMetaMask({ chainId, network });
    } catch (addNetworkError) {
      console.error("Error while adding network:", addNetworkError);
    }
  };

  const switchNetwork = async (networkId: number) => {
    const network = getNetworkFromNetworkId(networkId);

    if (!isMetaMaskInstalled || !account) return;
    if (!network) throw new Error("Network not supported");

    try {
      const chainId = getChainIdFromNetworkId(networkId);
      await switchNetworkOnMetamask({ chainId });
    } catch (switchNetworkError) {
      if (
        (switchNetworkError as TUnrecognizedNetworkError).code ===
        UNRECOGNIZED_NETWORK_ERROR_CODE
      ) {
        await handleAddNetwork(network);
      } else {
        notification.open({
          message: "Error switching network",
          description: (switchNetworkError as Error).message,
          type: "error",
        });
      }
    }
  };

  const checkConnection = useCallback(async () => {
    if (!isMetaMaskInstalled) {
      notification.open({
        message: "MetaMask is not installed",
        description: "Please install MetaMask to use this app",
        type: "error",
      });
      return;
    }

    try {
      removeItemFromLocalStorage("manuallyDisconnected");
      setItemFromLocalStorage("hasUserConnected", "true");
      setConnectionStatus("connecting");
      const accounts: TAccount[] = await getAccountsFromMetamask();
      if (!accounts.length) throw new Error("No accounts found");

      const chainId = await window.ethereum?.request({
        method: ETHEREUM_REQUEST_METHODS.ETH_CHAIN_ID,
      });
      setAccount(accounts[0]);
      setConnectionStatus("connected");
      handleChainChange(chainId);
    } catch (error) {
      setConnectionStatus("disconnected");
      notification.open({
        message: "Error connecting to MetaMask",
        description: (error as Error).message,
        type: "error",
      });
    }
  }, [handleChainChange]);

  const saveTransactionToHistory = ({
    recipient,
    amount,
    token,
    hash,
  }: TTransactionHistory) => {
    const newTransactionsHistory = [
      { recipient, amount, token, hash },
      ...transactionsHistory,
    ];
    setTransactionsHistory(newTransactionsHistory);
    setItemFromLocalStorage(
      "transactionsHistory",
      JSON.stringify(newTransactionsHistory)
    );
  };

  const sendTransaction = async ({
    recipient,
    amount,
    token,
  }: TTransaction) => {
    if (!isMetaMaskInstalled || !account) return null;

    setTransactionStatus("pending");
    try {
      const transactionHash = await sendTransactionEthers({
        recipient,
        amount,
        network: currentNetwork as TNetwork,
        token,
      });

      // Refetch token balances
      if (!!transactionHash) {
        fetchTokenBalance(currentNetwork as TNetwork);
        setTransactionStatus("success");
        notification.open({
          message: "Transaction sent",
          description: `Transaction hash: ${transactionHash}`,
          type: "success",
        });
        saveTransactionToHistory({
          recipient,
          amount,
          token,
          hash: transactionHash,
        });
        return transactionHash;
      } else {
        setTransactionStatus("error");
        return null;
      }
    } catch (error) {
      setTransactionStatus("error");
      notification.open({
        message: "Error sending transaction",
        description: (error as Error).message,
        type: "error",
      });
      return null;
    } finally {
      setTransactionStatus(null);
    }
  };

  useEffect(() => {
    if (
      !getItemFromLocalStorage("hasUserConnected") ||
      getItemFromLocalStorage("manuallyDisconnected") === "true"
    )
      return;

    checkConnection();
  }, [checkConnection, isMetaMaskInstalled]);

  useEffect(() => {
    if (!isMetaMaskInstalled) return;

    window.ethereum?.on("accountsChanged", handleAccountChange);
    window.ethereum?.on("chainChanged", handleChainChange);
    window.ethereum?.on("disconnect", handleDisconnect);
    return () => {
      window.ethereum?.removeListener("accountsChanged", handleAccountChange);
      window.ethereum?.removeListener("chainChanged", handleChainChange);
      window.ethereum?.removeListener("disconnect", handleDisconnect);
    };
  }, [
    isMetaMaskInstalled,
    handleAccountChange,
    handleChainChange,
    handleDisconnect,
  ]);

  useEffect(() => {
    const transactionsHistory = getItemFromLocalStorage("transactionsHistory");
    if (transactionsHistory) {
      setTransactionsHistory(JSON.parse(transactionsHistory));
    }
  }, []);

  const value = {
    account,
    currentNetwork,
    connectionStatus,
    supportedTokens,
    tokenBalances,
    isFetchingTokenBalances,
    transactionStatus,
    transactionsHistory,
    connectWallet: checkConnection,
    disconnectWallet: handleDisconnect,
    switchNetwork,
    getTokenBalances: fetchTokenBalance,
    sendTransaction,
  };

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
};
