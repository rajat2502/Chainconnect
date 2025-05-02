import { ethers } from "ethers";
import type { TransactionReceipt, Eip1193Provider } from "ethers";

import { getNetworkFromNetworkId } from "@/utils/network";
import { USDC_ADDRESSES } from "@/constants/network";
import type { TTransaction } from "@/types/wallet";

const erc20Abi = [
  // Function to get balance
  "function balanceOf(address owner) view returns (uint256)",
  // Function to get decimals
  "function decimals() view returns (uint8)",
  // Function to transfer
  "function transfer(address to, uint256 amount) returns (bool)",
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
    const formattedBalance = parseFloat(
      ethers.formatUnits(balanceBigNumber, decimals)
    ).toFixed(2);
    return {
      balance: balanceBigNumber.toString(),
      formattedBalance,
    };
  } catch (error) {
    console.error("Error fetching USDC balance:", error);
    return defaultBalance;
  }
};

export const sendTransaction = async ({
  recipient,
  amount,
  network,
  token,
}: TTransaction) => {
  if (!network) return "";

  try {
    const provider = new ethers.BrowserProvider(
      window.ethereum as Eip1193Provider
    );
    const signer = await provider.getSigner();

    let transactionReceipt: TransactionReceipt | null = null;

    if (!token.isNative) {
      const tokenAddress = USDC_ADDRESSES[network.id];
      const tokenContract = new ethers.Contract(tokenAddress, erc20Abi, signer);
      const decimals = await tokenContract.decimals();
      const amountToSend = ethers.parseUnits(amount, decimals);
      const transaction = await tokenContract.transfer(recipient, amountToSend);
      transactionReceipt = await transaction.wait();
    } else {
      const amountToSend = ethers.parseEther(amount);
      const transaction = await signer.sendTransaction({
        to: recipient,
        value: amountToSend,
      });
      transactionReceipt = await transaction.wait();
    }

    return transactionReceipt?.hash ?? "";
  } catch (error) {
    console.error("Error sending transaction:", error);
    return "";
  }
};
