import { Box, Typography, Button, Container, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"; // assuming username comes from Redux
import { routes } from "../constants/routes";

export const HomePage = () => {
  const navigate = useNavigate();

  // Example: picking first name from Redux auth slice
  const user = useSelector((state) => state.auth.user);
  const firstName = user?.name?.split(" ")[0] || "User";

  const handleStartExam = () => {
    navigate(routes.exam);
  };

  return (
    <Box
      minHeight="100vh"
      width="100%" 
      p={1}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      bgcolor="#f9f9f9"
      overflow="hidden"
      boxSizing="border-box"
    >
      <Paper
        elevation={3}
        width="100%"
        sx={{
          p: 4,
          textAlign: "center",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Hi, {firstName} 👋
        </Typography>

        <Box mt={6}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ px: 6, py: 2, fontSize: "1.2rem", borderRadius: 3 }}
            onClick={handleStartExam}
          >
            Start Exam
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};
