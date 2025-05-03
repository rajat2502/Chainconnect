import { useContext } from "react";
import { Typography } from "antd";

import { WalletContext } from "@/context/WalletContext";

import { TransactionHistoryItem } from "./TransactionHistoryItem";
import { wrapperStyles } from "./styles";
import { DefaultMessage } from "../ui/DefaultMessage";

const { Title } = Typography;

export const TransactionHistory = () => {
  const { account, transactionsHistory } = useContext(WalletContext);

  if (!account) {
    return (
      <div style={wrapperStyles}>
        <Title level={4}>Transaction History</Title>
        <DefaultMessage
          marginTop={24}
          message='Please connect your wallet to see your transaction history.'
        />
      </div>
    );
  }

  return (
    <div style={wrapperStyles}>
      <Title level={4}>Transaction History</Title>

      {transactionsHistory.length > 0 ? (
        <ul>
          {transactionsHistory.map((transaction, index) => (
            <TransactionHistoryItem
              key={transaction.hash}
              transaction={transaction}
              isLast={index === transactionsHistory.length - 1}
            />
          ))}
        </ul>
      ) : (
        <DefaultMessage
          marginTop={24}
          message='Please make your first transaction in order to see the history.'
        />
      )}
    </div>
  );
};
