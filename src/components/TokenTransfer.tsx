import { useContext, useState } from "react";
import { Button, Input, Select, Typography } from "antd";

import { DefaultMessage } from "@/components/ui/DefaultMessage";
import { WalletContext } from "@/context/WalletContext";
import {
  getAmountValidationError,
  getRecipientValidationError,
  getTokenValidationError,
} from "@/utils/validators";

import type { TToken } from "@/types/network";

const { Text, Title } = Typography;

const wrapperStyles = {
  padding: "24px",
  border: "1px solid #e0e0e0",
  borderRadius: "12px",
  minHeight: "120px",
  flex: 1,
};

export const TokenTransfer = () => {
  const { account, supportedTokens, transactionStatus, sendTransaction } =
    useContext(WalletContext);

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
      currentUser: account as string,
    });
    if (recipientError) {
      newErrors.recipient = recipientError;
    }

    const amountError = getAmountValidationError({ amount });
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

  if (!account) {
    return (
      <div style={wrapperStyles}>
        <Title level={4}>Transfer Token</Title>
        <DefaultMessage
          marginTop={24}
          message='Please connect your wallet to transfer tokens.'
        />
      </div>
    );
  }

  return (
    <div style={wrapperStyles}>
      <Title level={4}>Transfer Token</Title>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "16px" }}
      >
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
        <div style={{ display: "flex", flexDirection: "column" }}>
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

const ErrorMessage = ({ error }: { error: string }) => {
  return (
    <Text style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
      {error}
    </Text>
  );
};
