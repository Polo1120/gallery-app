import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Drawer,
} from "@mui/material";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import AvatarMenu from "../AvatarMenu/AvatarMenu";
import BottomBar from "../bottomBar/BottomBar";
import "./styles.css";
import NavMenu from "../NavMenu/NavMenu";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";

export const HeaderMobile = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <AppBar position="sticky" color="primary">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <Box display="flex" alignItems="center">
            <IconButton
              color="inherit"
              onClick={() => setOpen(true)}
              edge="start"
            >
              <MenuIcon />
            </IconButton>
          </Box>

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

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              component={Link}
              to="/upload"
              color="inherit"
              edge="end"
              aria-label="add"
              className="add-icon-button"
            />
            <AvatarMenu />
          </Box>
        </Toolbar>
      </AppBar>

    
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <Box
          p={2}
          sx={{
            "& .MuiBox-root": {
              display: "flex",
              flexDirection: "column",
            },
            "& .MuiButtonBase-root": {
              borderBottom: "1px solid #e0dada",
              borderRadius: "0px",
              width: "100%",
              justifyContent: "flex-start",
            },
            width: 250,
          }}
        >
          <NavMenu onClick={() => setOpen(false)} />
        </Box>
      </Drawer>

      <SearchBar />
      <BottomBar />
    </>
  );
};
