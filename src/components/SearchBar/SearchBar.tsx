import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { TextField, InputAdornment, IconButton, Box } from "@mui/material";
import "./styles.css";

const getInitialQuery = (search: string) => {
  const params = new URLSearchParams(search);
  return params.get("q") || "";
};

const updateQueryParams = (params: URLSearchParams, query: string) => {
  if (query) {
    params.set("q", query);
  } else {
    params.delete("q");
  }
  return params.toString();
};

export default function SearchBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [input, setInput] = useState(getInitialQuery(location.search));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = input.trim();
    const params = new URLSearchParams(location.search);
    const search = updateQueryParams(params, q);
    navigate({ pathname: "/q", search });
  };

  return (
    <Box
      component="form"
      sx={{
        padding: { xs: " 10px 16px 0", sm: 0},
      }}
      onSubmit={handleSubmit}
    >
      <TextField
        color="secondary"
        size="small"
        variant="outlined"
        placeholder="Search"
        value={input}
        fullWidth
        className="search-input-bar"
        onChange={(e) => setInput(e.target.value)}
        sx={{
          background: (theme) => theme.palette.secondary.main,
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton className="search-icon-button" sx={{ padding: "0px" }} type="submit">
               
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}
