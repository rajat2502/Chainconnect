import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";

export const isDesktopScreen = (screens: ReturnType<typeof useBreakpoint>) => {
  if (Object.keys(screens).length === 0) return true;
  return screens.lg || screens.xl;
};

export const isMobileScreen = (screens: ReturnType<typeof useBreakpoint>) => {
  if (Object.keys(screens).length === 0) return false;
  return screens.xs || screens.sm || screens.md;
};
