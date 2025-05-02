import type { TToken } from "@/types/network";
import { formatUnits } from "ethers";

type TFormatTokenAmountProps = {
  amount: bigint;
  token: TToken;
};

export const formatTokenAmount = ({
  amount,
  token,
}: TFormatTokenAmountProps) => {
  if (!amount) return "0";

  try {
    const formatted = formatUnits(amount, token.decimals);
    const decimalPlaces = token.symbol === "USDC" ? 2 : 4;
    const number = parseFloat(formatted);
    return number.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: decimalPlaces,
    });
  } catch (error) {
    console.error("Error formatting token amount", error);
    return "0";
  }
};

export const formatBalance = ({ amount, token }: TFormatTokenAmountProps) => {
  return `${formatTokenAmount({ amount, token })}`;
};
