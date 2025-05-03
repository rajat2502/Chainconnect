import { ethers } from "ethers";

import type { TTokenBalance } from "@/types/network";

export const getRecipientValidationError = ({
  recipient,
}: {
  recipient: string;
}) => {
  switch (true) {
    case !recipient:
      return "Recipient address is required";
    case !ethers.isAddress(recipient):
      return "Invalid recipient address";
    default:
      return null;
  }
};

export const getAmountValidationError = ({
  amount,
  tokenBalance,
}: {
  amount: string;
  tokenBalance: TTokenBalance;
}) => {
  switch (true) {
    case !amount:
      return "Amount is required";
    case isNaN(Number(amount)) || Number(amount) <= 0:
      return "Invalid amount (must be greater than 0)";
    case Number(amount) > Number(tokenBalance.formattedBalance):
      return "Amount is greater than the token balance in your wallet";
    default:
      return null;
  }
};

export const getTokenValidationError = ({
  tokenName,
}: {
  tokenName: string | null;
}) => {
  switch (true) {
    case !tokenName:
      return "Token is required";
    default:
      return null;
  }
};
