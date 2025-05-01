import { SUPPORTED_NETWORKS, USDC_ADDRESSES } from "@/constants/network";

import type { TNetwork, TToken } from "@/types/network";

export const getNetworkFromNetworkId = (networkId: number) =>
  SUPPORTED_NETWORKS.find((network) => network.id === networkId) || null;

export const getNetworkIdFromChainId = (chainId: string) =>
  parseInt(chainId, 16);

export const getChainIdFromNetworkId = (networkId: number) =>
  `0x${networkId.toString(16)}`;

export const getNativeToken = (network: TNetwork): TToken => {
  const { symbol, name } = network;
  return {
    symbol,
    name,
    decimals: 18,
    address: null,
    isNative: true,
    logo: null,
  };
};

export const getUsdcToken = (network: TNetwork): TToken => ({
  symbol: "USDC",
  name: "USD Coin",
  decimals: 6,
  address: USDC_ADDRESSES[network.id],
  isNative: false,
  logo: null,
});

export const getTokensForNetwork = (network: TNetwork) => {
  const nativeToken = getNativeToken(network);
  const usdcToken = getUsdcToken(network);
  return [nativeToken, usdcToken];
};
