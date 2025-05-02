import { createContext, useEffect, useState, useCallback } from "react";
import { notification } from "antd";

import {
  getChainIdFromNetworkId,
  getNetworkIdFromChainId,
  getNetworkFromNetworkId,
  getTokensForNetwork,
} from "@/utils/network";
import { formatBalance } from "@/utils/formatters";
import {
  ETHEREUM_REQUEST_METHODS,
  UNRECOGNIZED_NETWORK_ERROR_CODE,
} from "@/constants";

import type {
  TAccount,
  TConnectionStatus,
  TTransaction,
  TTransactionStatus,
  TUnrecognizedNetworkError,
  TWalletContext,
} from "@/types/wallet";
import type { TNetwork, TToken, TTokenBalance } from "@/types/network";
import {
  getUsdcBalance,
  sendTransaction as sendTransactionEthers,
} from "@/utils/ethers";
import {
  setItemFromLocalStorage,
  getItemFromLocalStorage,
  removeItemFromLocalStorage,
} from "@/utils/storage";

const defaultWalletContext: TWalletContext = {
  account: null,
  currentNetwork: null,
  connectionStatus: "disconnected",
  supportedTokens: [],
  tokenBalances: [],
  isFetchingTokenBalances: false,
  transactionStatus: null,
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
            const balanceBigInt: bigint = await window.ethereum?.request({
              method: ETHEREUM_REQUEST_METHODS.ETH_GET_BALANCE,
              params: [account, "latest"],
            });
            balance = {
              token,
              balance: balanceBigInt.toString(),
              formattedBalance: formatBalance({ amount: balanceBigInt, token }),
            };
          } else {
            const { balance: balanceAsString, formattedBalance } =
              await getUsdcBalance({
                address: account,
                networkId: network.id,
              });
            balance = {
              token,
              balance: balanceAsString,
              formattedBalance,
            };
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
      await window.ethereum?.request({
        method: ETHEREUM_REQUEST_METHODS.ADD_NETWORK,
        params: [
          {
            chainId,
            chainName: network.name,
            nativeCurrency: {
              name: network.symbol,
              symbol: network.symbol,
              decimals: 18,
            },
            rpcUrls: [network.rpcUrl],
            blockExplorerUrls: [network.explorerUrl],
          },
        ],
      });
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
      await window.ethereum?.request({
        method: ETHEREUM_REQUEST_METHODS.SWITCH_NETWORK,
        params: [{ chainId }],
      });
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
    try {
      removeItemFromLocalStorage("manuallyDisconnected");
      setConnectionStatus("connecting");
      const accounts: TAccount[] = await window.ethereum?.request({
        method: ETHEREUM_REQUEST_METHODS.ETH_REQUEST_ACCOUNTS,
      });

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
      fetchTokenBalance(currentNetwork as TNetwork);
      setTransactionStatus("success");
      notification.open({
        message: "Transaction sent",
        description: `Transaction hash: ${transactionHash}`,
        type: "success",
      });
      return transactionHash;
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
    if (!isMetaMaskInstalled) {
      notification.open({
        message: "MetaMask is not installed",
        description: "Please install MetaMask to use this app",
        type: "error",
      });
      return;
    }
    if (getItemFromLocalStorage("manuallyDisconnected") === "true") return;

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

  const value = {
    account,
    currentNetwork,
    connectionStatus,
    supportedTokens,
    tokenBalances,
    isFetchingTokenBalances,
    transactionStatus,
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
