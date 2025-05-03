import { Layout, Typography } from "antd";

const { Footer: AntdFooter } = Layout;
const { Text } = Typography;

export const Footer = () => {
  return (
    <AntdFooter
      style={{
        textAlign: "center",
        height: "auto",
        padding: "16px 0",
      }}
    >
      <Text>© 2025 ChainConnect.</Text>
    </AntdFooter>
  );
};
