import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";

export const isDesktopScreen = (screens: ReturnType<typeof useBreakpoint>) => {
  return screens.lg || screens.xl;
};

export const isMobileScreen = (screens: ReturnType<typeof useBreakpoint>) => {
  return screens.xs || screens.sm || screens.md;
};
