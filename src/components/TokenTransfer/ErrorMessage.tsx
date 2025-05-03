import { Typography } from "antd";

const { Text } = Typography;

export const ErrorMessage = ({ error }: { error: string }) => {
  return (
    <Text style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
      {error}
    </Text>
  );
};
