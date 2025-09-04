import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { routes } from "../constants/routes";
import { useEffect } from "react";

export const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(routes.home);
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      textAlign="center"
      sx={{ bgcolor: "#f9f9f9", p: 3 }}
    >
      <Typography variant="h1" color="primary" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        Oops! The page you’re looking for doesn’t exist.
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={3}>
        It might have been moved or deleted.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate(routes.home)}
      >
        Go Home
      </Button>
    </Box>
  );
};
