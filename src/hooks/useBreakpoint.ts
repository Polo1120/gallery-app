
import { useTheme } from "@mui/material/styles";
import {useMediaQuery } from "@mui/material";

export function useBreakpoint() {
  const theme = useTheme();

  return {
    isXs: useMediaQuery(theme.breakpoints.down("xs")),
    isSm: useMediaQuery(theme.breakpoints.down("sm")),
    isMd: useMediaQuery(theme.breakpoints.down("md")),
    isLg: useMediaQuery(theme.breakpoints.down("lg")),
    isXl: useMediaQuery(theme.breakpoints.up("xl")),
  };
}
