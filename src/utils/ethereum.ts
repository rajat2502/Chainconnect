import { ETHEREUM_REQUEST_METHODS } from "@/constants";
import { USDC_ADDRESSES } from "@/constants/network";
import type { TNetwork } from "@/types/network";

const padAddress = (address: string) => {
  const clean = address.replace(/^0x/, "");
  return clean.padStart(64, "0");
};

const BALANCE_OF_SELECTOR = "0x70a08231";
const defaultBalance = { balance: "0", formattedBalance: "0" };

export async function getUSDCBalance({
  account,
  network,
}: {
  account: string;
  network: TNetwork;
}) {
  try {
    if (!network) return defaultBalance;

    const usdcAddress = USDC_ADDRESSES[network.id];
    const data = BALANCE_OF_SELECTOR + padAddress(account);
    const params = [
      {
        to: usdcAddress,
        data,
      },
      "latest",
    ];

    const result: string = await window.ethereum?.request({
      method: ETHEREUM_REQUEST_METHODS.ETH_CALL,
      params,
    });
    const balance = result && result !== "0x" ? BigInt(result) : 0;
    const formatted = Number(balance) / 1e6;

    return {
      balance: balance.toString(),
      formattedBalance: formatted.toString(),
    };
  } catch (error) {
    console.error("Error fetching USDC balance:", error);
    return defaultBalance;
  }
}
