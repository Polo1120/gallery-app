import React from "react";
import { Box, Typography, Button } from "@mui/material";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import { Link } from "react-router-dom";

const EmptySearch: React.FC<{ query: string }> = ({ query }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="70vh"
      textAlign="center"
      px={2}
    >
      <SearchOffIcon sx={{ fontSize: 80, color: "text.secondary", mb: 2 }} />

      <Typography variant="h5" gutterBottom>
        No encontramos resultados para "{query}"
      </Typography>

      <Typography variant="body1" color="text.secondary" mb={3}>
        Revisa la ortografía o intenta con otra palabra clave.
      </Typography>

      <Button
        component={Link}
        to="/gallery"
        variant="contained"
        color="primary"
        sx={{ borderRadius: 2, px: 4 }}
      >
        Volver a la galería
      </Button>
    </Box>
  );
};

export default EmptySearch;
