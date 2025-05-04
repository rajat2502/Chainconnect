import { Button, Typography, message } from "antd";

import { CopyOutlined } from "@/svgs/copyOutlined";
import { Sent } from "@/svgs/sent";
import type { TTransactionHistory } from "@/types/wallet";

import {
  historyItemStyles,
  historyItemTextStyles,
  sentIconStyles,
  amountStyles,
  recipientStyles,
  copyHashButtonStyles,
  historyItemContentStyles,
} from "./styles";

const { Text } = Typography;

export const TransactionHistoryItem = ({
  transaction,
  isLast,
}: {
  transaction: TTransactionHistory;
  isLast: boolean;
}) => {
  const handleHashCopy = () => {
    const hash = transaction.hash;
    navigator.clipboard.writeText(hash);
    message.success("Transaction hash copied to clipboard!");
  };

  const { recipient, amount, token } = transaction;
  const { symbol, network } = token;
  return (
    <li
      style={{
        ...historyItemStyles,
        borderBottom: isLast ? "none" : "1px solid #e0e0e0",
      }}
    >
      <div style={historyItemContentStyles}>
        <span style={sentIconStyles}>
          <Sent />
        </span>
        <div style={historyItemTextStyles as React.CSSProperties}>
          <Text style={amountStyles}>
            Sent {amount} {symbol} {symbol === "USDC" ? `(${network})` : ""}
          </Text>
          <Text style={recipientStyles}>To {recipient}</Text>
        </div>
      </div>
      <Button
        size='small'
        icon={<CopyOutlined />}
        onClick={handleHashCopy}
        style={copyHashButtonStyles}
      >
        Copy Hash
      </Button>
    </li>
  );
};
