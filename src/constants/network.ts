import { Ethereum } from "@/svgs/ethereum";
import { Xdai } from "@/svgs/xdai";
import { Polygon } from "@/svgs/polygon";

import type { TNetwork } from "@/types/network";

const ethereumRpcUrl = process.env.NEXT_PUBLIC_ETHEREUM_RPC_URL;
const gnosisRpcUrl = process.env.NEXT_PUBLIC_GNOSIS_RPC_URL;
const polygonRpcUrl = process.env.NEXT_PUBLIC_POLYGON_RPC_URL;

if (!ethereumRpcUrl || !gnosisRpcUrl || !polygonRpcUrl) {
  throw new Error("RPC URLs are not set");
}

export const SUPPORTED_NETWORKS: TNetwork[] = [
  {
    id: 1,
    name: "Ethereum",
    symbol: "ETH",
    rpcUrl: ethereumRpcUrl,
    explorerUrl: "https://etherscan.io",
    logo: Ethereum,
  },
  {
    id: 100,
    name: "Gnosis",
    symbol: "XDAI",
    rpcUrl: gnosisRpcUrl,
    explorerUrl: "https://gnosisscan.io",
    logo: Xdai,
  },
  {
    id: 137,
    name: "Polygon",
    symbol: "POL",
    rpcUrl: polygonRpcUrl,
    explorerUrl: "https://polygonscan.com",
    logo: Polygon,
  },
] as const;

export const USDC_ADDRESSES: Record<number, string> = {
  [1]: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  [100]: "0xddafbb505ad214d7b80b1f830fccc89b60fb7a83",
  [137]: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
};
