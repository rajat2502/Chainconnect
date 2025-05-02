import { ethers } from "ethers";

export const getRecipientValidationError = ({
  recipient,
  currentUser,
}: {
  recipient: string;
  currentUser: string;
}) => {
  switch (true) {
    case !recipient:
      return "Recipient address is required";
    case !ethers.isAddress(recipient):
      return "Invalid recipient address";
    case recipient.toLowerCase() === currentUser.toLowerCase():
      return "Recipient cannot be the current user";
    default:
      return null;
  }
};

export const getAmountValidationError = ({ amount }: { amount: string }) => {
  switch (true) {
    case !amount:
      return "Amount is required";
    case isNaN(Number(amount)) || Number(amount) <= 0:
      return "Invalid amount (must be greater than 0)";
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
