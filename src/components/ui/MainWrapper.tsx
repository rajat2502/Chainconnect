import { Layout } from "antd";

const { Content: AntdContent } = Layout;

export const MainWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <AntdContent
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {children}
    </AntdContent>
  );
};
