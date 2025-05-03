import { Typography } from "antd";

import type { TTokenBalance } from "@/types/network";

import {
  tokenBalanceItemStyles,
  tokenDetailsStyles,
  tokenLogoStyles,
  tokenNameStyles,
} from "./styles";

const { Text } = Typography;

export const TokenBalanceItem = ({
  tokenBalance,
  hasBorder,
}: {
  tokenBalance: TTokenBalance;
  hasBorder: boolean;
}) => {
  const { token, formattedBalance } = tokenBalance;
  const { name, symbol } = token;

  return (
    <li
      style={{
        ...tokenBalanceItemStyles,
        borderBottom: hasBorder ? "1px solid #e0e0e0" : "none",
      }}
      key={symbol}
    >
      <div style={tokenDetailsStyles}>
        {token.logo && <token.logo style={tokenLogoStyles} />}
        <Text style={tokenNameStyles}>{name}</Text>
      </div>
      <div>
        <Text>
          {formattedBalance} {symbol}
        </Text>
      </div>
    </li>
  );
};
