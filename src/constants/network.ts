import { TNetwork } from "@/types/network";

export const SUPPORTED_NETWORKS: TNetwork[] = [
  {
    id: 1,
    name: "Ethereum",
    symbol: "ETH",
    rpcUrl: "https://ethereum.publicnode.com",
    explorerUrl: "https://etherscan.io",
  },
  {
    id: 100,
    name: "Gnosis",
    symbol: "XDAI",
    rpcUrl: "https://rpc.gnosischain.com",
    explorerUrl: "https://gnosisscan.io",
  },
  {
    id: 137,
    name: "Polygon",
    symbol: "MATIC",
    rpcUrl: "https://polygon-mainnet.public.blastapi.io",
    explorerUrl: "https://polygonscan.com",
  },
] as const;

export const USDC_ADDRESSES: Record<number, string> = {
  [1]: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  [100]: "0xddafbb505ad214d7b80b1f830fccc89b60fb7a83",
  [137]: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
};
