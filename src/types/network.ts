export type TNetwork = {
  id: number;
  name: string;
  symbol: string;
  rpcUrl: string;
  explorerUrl: string;
  logo: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  colorCode: string;
};

export type TToken = {
  symbol: string;
  name: string;
  decimals: number;
  address: string | null;
  isNative: boolean;
  logo: React.ComponentType<React.SVGProps<SVGSVGElement>> | null;
};

export type TTokenBalance = {
  token: TToken;
  balance: string;
  formattedBalance: string;
};
