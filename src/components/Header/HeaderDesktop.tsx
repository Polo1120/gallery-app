import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import AvatarMenu from "../AvatarMenu/AvatarMenu";
import NavMenu from "../NavMenu/NavMenu";

export const HeaderDesktop = () => {
  return (
    <AppBar position="sticky" color="primary">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        <NavMenu />
        <Typography
          component="div"
          sx={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          <Link
            to="/gallery"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            Mi Galería
          </Link>
        </Typography>

        <Box display="flex" alignItems="center" gap={2}>
          <SearchBar />
          <AvatarMenu />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
