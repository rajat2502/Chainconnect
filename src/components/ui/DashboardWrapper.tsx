import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";

import { isDesktopScreen } from "@/utils/style";

export const DashboardWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const screens = useBreakpoint();
  const isDesktop = isDesktopScreen(screens);

  return (
    <div
      style={{
        display: "flex",
        gap: "32px",
        flexWrap: "wrap",
        margin: isDesktop ? "48px 120px" : "48px 24px",
        flex: isDesktop ? 1 : "none",
      }}
    >
      {children}
    </div>
  );
};
