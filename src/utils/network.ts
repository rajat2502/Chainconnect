import { SUPPORTED_NETWORKS, USDC_ADDRESSES } from "@/constants/network";

import { Usdc } from "@/svgs/usdc";
import type { TNetwork, TToken } from "@/types/network";

export const getNetworkFromNetworkId = (networkId: number) => {
  const network = SUPPORTED_NETWORKS.find(
    (network) => network.id === networkId
  );
  if (!network) {
    return { id: networkId, name: "UNSUPPORTED" } as TNetwork;
  }
  return network;
};

export const getNetworkIdFromChainId = (chainId: string) =>
  parseInt(chainId, 16);

export const getChainIdFromNetworkId = (networkId: number) =>
  `0x${networkId.toString(16)}`;

export const getNativeToken = (network: TNetwork): TToken => {
  const { symbol, name, logo } = network;
  return {
    symbol,
    name,
    decimals: 18,
    address: null,
    isNative: true,
    network: network.name,
    logo,
  };
};

export const getUsdcToken = (network: TNetwork): TToken => ({
  symbol: "USDC",
  name: "USD Coin",
  decimals: 6,
  address: USDC_ADDRESSES[network.id],
  isNative: false,
  network: network.name,
  logo: Usdc,
});

export const getTokensForNetwork = (network: TNetwork) => {
  const nativeToken = getNativeToken(network);
  const usdcToken = getUsdcToken(network);
  return [nativeToken, usdcToken];
};
