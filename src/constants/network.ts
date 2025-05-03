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
    colorCode: "#627EEA",
  },
  {
    id: 100,
    name: "Gnosis",
    symbol: "XDAI",
    rpcUrl: gnosisRpcUrl,
    explorerUrl: "https://gnosisscan.io",
    logo: Xdai,
    colorCode: "#48a9a6",
  },
  {
    id: 137,
    name: "Polygon",
    symbol: "POL",
    rpcUrl: polygonRpcUrl,
    explorerUrl: "https://polygonscan.com",
    logo: Polygon,
    colorCode: "#8247e5",
  },
] as const;

export const USDC_ADDRESSES: Record<number, string> = {
  [1]: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  [100]: "0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83",
  [137]: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
};
