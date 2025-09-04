import { useState } from "react";
import { loginUser } from "../../features/auth/services/auth";
import { useAuth } from "../../context/AuthContext/useAuth";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Stack,
  FormLabel,
  CircularProgress,
} from "@mui/material";

function LoginForm() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = await loginUser(email, password);
      login(data.token);
      navigate("/gallery");
    } catch {
      setError("email or password is incorrect");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
      p={2}
    >
      <Paper
        elevation={3}
        sx={{ p: 4, maxWidth: 400, width: "80%", position: "relative" }}
      >
        <Typography>
          <b>Welcome!</b>
        </Typography>
        <Typography>Sign in to continue.</Typography>
        <Box component="form" marginTop={2} onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <FormLabel sx={{ color: "text.primary" }}>Email</FormLabel>
            <TextField
              type="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
              sx={{
                "& .MuiInputBase-input": {
                  padding: "12px 10px",
                },
                marginTop: "10px!important",
              }}
            />
            <FormLabel sx={{ color: "text.primary" }}>Password</FormLabel>
            <TextField
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
              sx={{
                "& .MuiInputBase-input": {
                  padding: "12px 10px",
                },
                marginTop: "10px!important",
              }}
            />

            {error && (
              <Typography color="error" variant="body2" textAlign="center">
                {error}
              </Typography>
            )}

            <Button type="submit" variant="contained" color="success" fullWidth>
              Sign In
            </Button>
          </Stack>
        </Box>
        <CircularProgress
          color="info"
          size={22}
          sx={{
            display: loading ? "flex" : "none",
            position: "absolute",
            bottom: "4px",
            left: "48%",
            transform: "translateX(-50%)",
          }}
        />
      </Paper>
    </Box>
  );
}

export default LoginForm;
