import { Typography } from "antd";

const { Text } = Typography;

export const DefaultMessage = ({
  message,
  marginTop = 12,
}: {
  message: string;
  marginTop?: number;
}) => {
  return (
    <div style={{ marginTop: marginTop }}>
      <Text>{message}</Text>
    </div>
  );
};
