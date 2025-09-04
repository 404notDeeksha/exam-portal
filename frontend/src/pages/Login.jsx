import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Alert,
  Paper,
} from "@mui/material";
import { loginUser } from "../features/auth/authThunks";
import { useNavigate } from "react-router-dom";
import { routes } from "../constants/routes";

export const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, token } = useSelector((state) => state.auth);

  const validateForm = () => {
    let errors = {};
    if (!form.email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      errors.email = "Enter a valid email";
    if (!form.password) errors.password = "Password is required";
    return errors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: "" }); // clear error on input
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors); // field-level errors
      return;
    }
    dispatch(loginUser(form)); // thunk handles API + persist
  };

  // Redirect on successful login
  useEffect(() => {
    if (token) {
      navigate(routes.home);
    }
  }, [token, navigate]);

  console.log("Err", error);
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="#f9f9f9"
      p={3}
      width="100vw"
    >
      <Paper
        elevation={4}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 400,
          borderRadius: 3,
          boxSizing: "border-box",
        }}
      >
        <Typography variant="h5" fontWeight="bold" align="center" gutterBottom>
          Login
        </Typography>

        {/* 🔹 API-level error */}
        <Paper
          elevation={4}
          sx={{
            p: 4,
            width: "100%",
            maxWidth: 500,
            borderRadius: 3,
            boxSizing: "border-box",
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            align="center"
            gutterBottom
          >
            Login
          </Typography>

          {/* 🔹 API-level error */}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              margin="normal"
              required
              error={Boolean(formErrors.email)}
              helperText={formErrors.email}
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              margin="normal"
              required
              error={Boolean(formErrors.password)}
              helperText={formErrors.password}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2, py: 1.2, fontWeight: "bold", fontSize: "1rem" }}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </Paper>

        <form onSubmit={handleSubmit} noValidate>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            margin="normal"
            required
            error={Boolean(formErrors.email)}
            helperText={formErrors.email}
          />

          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            margin="normal"
            required
            error={Boolean(formErrors.password)}
            helperText={formErrors.password}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 4, py: 1.2, fontWeight: "bold", fontSize: "1rem" }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};
