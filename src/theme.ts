// theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#E5E8EB",
      contrastText: "#000000",
    },
    secondary: {
      main: "#F0F2F5",
    },
    success: {
      main: "#000000",
      contrastText: "#fff",
    },
    warning: {
      main: "#ff9800",
    },
    error: {
      main: "#f44336",
    },
    info: {
      main: "#111111",
      contrastText: "#fff",
    },
    text: {
      primary: "#141414",
      secondary: "#61758A",
    },
    background: {
      default: "#f4f6f8",
      paper: "#F0F2F5",
    },
  },
  typography: {
    fontFamily: "Plus Jakarta Sans, Arial, sans-serif",
    fontSize: 14,
    h4: {
      textTransform: "capitalize",
      fontSize: "28px",
      margin: "28px 0 0 0",
      fontWeight: 500,
      lineHeight: 1.2,
    },
    h6: {
      textTransform: "capitalize",
      fontSize: "16px",
      margin: "24px 0 0 0",
      fontWeight: "normal",
      lineHeight: 1.2,
    },
  },
});

export default theme;
