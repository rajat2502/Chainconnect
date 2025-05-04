import { Layout, Typography } from "antd";

const { Footer: AntdFooter } = Layout;
const { Text } = Typography;

export const Footer = () => {
  return (
    <AntdFooter
      className='footer'
      style={{
        textAlign: "center",
        height: "auto",
        padding: "24px",
        borderTop: "1px solid #e0e0e0",
        backgroundColor: "white",
        marginTop: "24px",
      }}
    >
      <Text style={{ color: "#64748b" }}>© 2025 ChainConnect.</Text>
    </AntdFooter>
  );
};
