import { COINGECKO_PLATFORM_CHAIN_MAPPING } from "@/constants";

const COINGECKO_API_BASE_URL = "https://api.coingecko.com/api/v3";
const COINGECKO_API_KEY = process.env.NEXT_PUBLIC_COINGECKO_API_KEY as string;

type TNetworkToken = {
  id: string;
  name: string;
  symbol: string;
  platforms: {
    [key: string]: string;
  };
};

/**  NOTE: The API is functional but I'm not utilising it at the moment as
 * I'm unsure where I should show this list of tokens. */
export const fetchAvailableTokensOnNetowrk = async (
  networkName: keyof typeof COINGECKO_PLATFORM_CHAIN_MAPPING
) => {
  const platform = COINGECKO_PLATFORM_CHAIN_MAPPING[networkName];
  const url = new URL(`${COINGECKO_API_BASE_URL}/coins/list`);
  url.searchParams.set("include_platform", "true");
  url.searchParams.set("x_cg_demo_api_key", COINGECKO_API_KEY);

  const response = await fetch(url.toString());
  const data = await response.json();
  const tokens = data.filter(
    (token: TNetworkToken) => token.platforms[platform]
  );
  return tokens;
};
