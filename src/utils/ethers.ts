import { ethers } from "ethers";

import { getNetworkFromNetworkId } from "@/utils/network";
import { USDC_ADDRESSES } from "@/constants/network";

const erc20Abi = [
  // Function to get balance
  "function balanceOf(address owner) view returns (uint256)",
  // Function to get decimals
  "function decimals() view returns (uint8)",
];

const defaultBalance = {
  balance: "0",
  formattedBalance: "0",
};

export const getUsdcBalance = async ({
  address,
  networkId,
}: {
  address: string;
  networkId: number;
}): Promise<{ balance: string; formattedBalance: string }> => {
  const network = getNetworkFromNetworkId(networkId);
  if (!network) return defaultBalance;

  try {
    const { rpcUrl } = network;
    const usdcAddress = USDC_ADDRESSES[networkId];
    const provider = new ethers.JsonRpcProvider(rpcUrl);
    const usdcContract = new ethers.Contract(usdcAddress, erc20Abi, provider);

    const [balanceBigNumber, decimals] = await Promise.all([
      usdcContract.balanceOf(address),
      usdcContract.decimals(),
    ]);
    const formattedBalance = ethers.formatUnits(balanceBigNumber, decimals);
    return {
      balance: balanceBigNumber.toString(),
      formattedBalance,
    };
  } catch (error) {
    console.error("Error fetching USDC balance:", error);
    return defaultBalance;
  }
};
