export const DashboardLeftWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        flex: 1,
      }}
    >
      {children}
    </div>
  );
};
