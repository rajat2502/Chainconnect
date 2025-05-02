import { useContext, useState } from "react";
import { Button, Input, Select } from "antd";

import { WalletContext } from "@/context/WalletContext";
import type { TToken } from "@/types/network";

export const TokenTransfer = () => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [token, setToken] = useState<TToken["name"] | null>(null);

  const { supportedTokens, sendTransaction } = useContext(WalletContext);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const tokenDetails = supportedTokens.find((t) => t.name === token);
    if (!tokenDetails) return;
    sendTransaction({ recipient, amount, token: tokenDetails });
  };

  return (
    <div
      style={{
        padding: "24px",
        border: "1px solid #e0e0e0",
        borderRadius: "12px",
        minHeight: "120px",
        flex: 1,
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <Input
          placeholder='Recipient'
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          size='large'
        />
        <Input
          placeholder='Amount'
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          size='large'
        />
        <Select
          placeholder='Select Token'
          options={supportedTokens.map((token) => ({
            label: token.name,
            value: token.name,
          }))}
          value={token}
          onChange={(value) => setToken(value)}
          suffixIcon={"lol"}
          size='large'
        />
        <Button type='primary' htmlType='submit' size='large'>
          Transfer
        </Button>
      </form>
    </div>
  );
};
