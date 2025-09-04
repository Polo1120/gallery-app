import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function BottomBar() {
  const [value, setValue] = useState(0);

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1200,
        backgroundColor: "primary.main",
      }}
      elevation={3}
      className="bottom-bar"
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(_, newValue) => setValue(newValue)}
      >
        <BottomNavigationAction
          label="Galería"
          component={Link}
          to="/gallery"
          className="bottom-nav-icon-home"
        />
        <BottomNavigationAction
          label="Subir"
          component={Link}
          to="/upload"
          className="bottom-nav-icon-upload"
        />
        <BottomNavigationAction
          label="Perfil"
          component={Link}
          to="/profile"
          className="bottom-nav-icon-profile"
        />
      </BottomNavigation>
    </Paper>
  );
}
