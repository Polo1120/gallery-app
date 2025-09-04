import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

const menuItems = [
  { label: "For you", path: "/for-you" },
  { label: "Following", path: "/following" },
  { label: "Explore", path: "/explore" },
];

export default function NavMenu({ onClick }: { onClick?: () => void }) {
  return (
    <Box display="flex" gap={{ xs: 0, sm: 2 }}>
      {menuItems.map((item) => (
        <Button
          key={item.label}
          component={Link}
          to={item.path}
          color="inherit"
          onClick={onClick}
          sx={{ textTransform: "none", fontWeight: 500 }}
        >
          {item.label}
        </Button>
      ))}
    </Box>
  );
}
