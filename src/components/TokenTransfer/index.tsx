import { CSSProperties, useContext, useState } from "react";
import { Button, Input, Select, Typography } from "antd";

import { DefaultMessage } from "@/components/ui/DefaultMessage";
import { WalletContext } from "@/context/WalletContext";
import {
  getAmountValidationError,
  getRecipientValidationError,
  getTokenValidationError,
} from "@/utils/validators";
import type { TToken, TTokenBalance } from "@/types/network";

import { ErrorMessage } from "./ErrorMessage";
import { formStyles, selectWrapperStyles, wrapperStyles } from "./styles";

const { Title } = Typography;

export const TokenTransfer = () => {
  const {
    account,
    currentNetwork,
    supportedTokens,
    transactionStatus,
    tokenBalances,
    sendTransaction,
  } = useContext(WalletContext);

  const [formData, setFormData] = useState<{
    recipient: string;
    amount: string;
    tokenName: string | null;
  }>({
    recipient: "",
    amount: "",
    tokenName: null,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const { recipient, amount, tokenName } = formData;

    const recipientError = getRecipientValidationError({
      recipient,
    });
    if (recipientError) {
      newErrors.recipient = recipientError;
    }

    const tokenBalance = tokenBalances.find(
      (balance) => balance.token.name === tokenName
    ) as TTokenBalance;
    const amountError = getAmountValidationError({
      amount,
      tokenBalance,
    });
    if (amountError) {
      newErrors.amount = amountError;
    }

    const tokenError = getTokenValidationError({
      tokenName,
    });
    if (tokenError) {
      newErrors.tokenName = tokenError;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { recipient, amount, tokenName } = formData;

    if (!validateForm()) return;

    const token = supportedTokens.find((token) => token.name === tokenName);
    const transactionHash = await sendTransaction({
      recipient,
      amount,
      token: token as TToken,
    });

    if (!!transactionHash) {
      handleReset();
    }
  };

  const resetErrorForField = (field: string) => {
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    resetErrorForField(name);
  };

  const handleTokenChange = (value: string) => {
    setFormData({ ...formData, tokenName: value });
    resetErrorForField("token");
  };

  const handleReset = () => {
    setFormData({
      recipient: "",
      amount: "",
      tokenName: null,
    });
  };

  if (!account || currentNetwork?.name === "UNSUPPORTED") {
    return (
      <div style={wrapperStyles}>
        <Title level={4}>Transfer Token</Title>
        <DefaultMessage
          marginTop={24}
          message={
            currentNetwork?.name === "UNSUPPORTED"
              ? "Please connect to a supported network to transfer tokens."
              : "Please connect your wallet to transfer tokens."
          }
        />
      </div>
    );
  }

  return (
    <div style={wrapperStyles}>
      <Title level={4}>Transfer Token</Title>
      <form onSubmit={handleSubmit} style={formStyles as CSSProperties}>
        <div>
          <Input
            placeholder='Recipient'
            name='recipient'
            value={formData.recipient}
            onChange={handleChange}
            size='large'
            status={errors.recipient ? "error" : undefined}
          />
          {errors.recipient && <ErrorMessage error={errors.recipient} />}
        </div>
        <div>
          <Input
            placeholder='Amount'
            name='amount'
            value={formData.amount}
            onChange={handleChange}
            size='large'
            status={errors.amount ? "error" : undefined}
          />
          {errors.amount && <ErrorMessage error={errors.amount} />}
        </div>
        <div style={selectWrapperStyles as CSSProperties}>
          <Select
            placeholder='Select Token'
            value={formData.tokenName}
            onChange={handleTokenChange}
            size='large'
            status={errors.tokenName ? "error" : undefined}
          >
            {supportedTokens.map((token) => (
              <Select.Option
                key={token.name}
                value={token.name}
                style={{
                  padding: "12px",
                }}
              >
                {token.symbol}
              </Select.Option>
            ))}
          </Select>
          {errors.tokenName && <ErrorMessage error={errors.tokenName} />}
        </div>
        <Button
          type='primary'
          htmlType='submit'
          size='large'
          loading={transactionStatus === "pending"}
        >
          {transactionStatus === "pending"
            ? "Transferring..."
            : "Transfer Tokens"}
        </Button>
      </form>
    </div>
  );
};
