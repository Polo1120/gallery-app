import React from "react";
import { Avatar, Menu, MenuItem, IconButton } from "@mui/material";
import { useAuth } from "../../context/AuthContext/useAuth";

const AvatarMenu: React.FC = () => {
  const { logout } = useAuth();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
        <Avatar alt="User Avatar" src="/static/images/avatar/1.jpg" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleClose}>Perfil</MenuItem>
        <MenuItem onClick={handleClose}>Configuración</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default AvatarMenu;
