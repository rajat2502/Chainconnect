import { ETHEREUM_REQUEST_METHODS } from "@/constants";
import { USDC_ADDRESSES } from "@/constants/network";
import { formatBalance } from "@/utils/formatters";
import type { TNetwork, TToken } from "@/types/network";

export const getAccountsFromMetamask = async () => {
  const accounts = await window.ethereum?.request({
    method: ETHEREUM_REQUEST_METHODS.ETH_REQUEST_ACCOUNTS,
  });

  return accounts;
};

export const switchNetworkOnMetamask = async ({
  chainId,
}: {
  chainId: string;
}) => {
  await window.ethereum?.request({
    method: ETHEREUM_REQUEST_METHODS.SWITCH_NETWORK,
    params: [{ chainId }],
  });
};

export const addNetworkToMetaMask = async ({
  chainId,
  network,
}: {
  chainId: string;
  network: TNetwork;
}) => {
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
};

export const getNativeTokenBalance = async ({
  account,
  token,
}: {
  account: string;
  token: TToken;
}): Promise<{ token: TToken; balance: string; formattedBalance: string }> => {
  const balance = await window.ethereum?.request({
    method: ETHEREUM_REQUEST_METHODS.ETH_GET_BALANCE,
    params: [account, "latest"],
  });

  const formattedBalance = formatBalance({ amount: balance, token });
  return {
    token,
    balance: balance.toString(),
    formattedBalance: formattedBalance.toString(),
  };
};

const padAddress = (address: string) => {
  const clean = address.replace(/^0x/, "");
  return clean.padStart(64, "0");
};

const BALANCE_OF_SELECTOR = "0x70a08231";
const defaultBalance = { token: null, balance: "0", formattedBalance: "0" };
export async function getUSDCBalance({
  account,
  network,
  token,
}: {
  account: string;
  network: TNetwork;
  token: TToken;
}) {
  try {
    if (!network) return defaultBalance;

    const usdcAddress = USDC_ADDRESSES[network.id];
    const data = BALANCE_OF_SELECTOR + padAddress(account);

    const result: string = await window.ethereum?.request({
      method: ETHEREUM_REQUEST_METHODS.ETH_CALL,
      params: [
        {
          to: usdcAddress,
          data,
        },
        "latest",
      ],
    });
    const balance = result && result !== "0x" ? BigInt(result) : 0;
    const formatted = Number(balance) / 1e6;

    return {
      token,
      balance: balance.toString(),
      formattedBalance: formatted.toString(),
    };
  } catch (error) {
    console.log("Error fetching USDC balance:", error);
    return defaultBalance;
  }
}
