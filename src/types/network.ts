export type TNetwork = {
  id: number;
  name: string;
  symbol: string;
  rpcUrl: string;
  explorerUrl: string;
};

export type TToken = {
  symbol: string;
  name: string;
  decimals: number;
  address: string | null;
  isNative: boolean;
  logo: string | null;
};

export type TTokenBalance = {
  token: TToken;
  balance: string;
  formattedBalance: string;
};
