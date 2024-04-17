import { Box, Container } from "@mui/material";
import Login from "@/components/Login";

const DashboardLoginPage = () => {
  return (
    <Container maxWidth="xs" sx={{ padding: "2rem" }}>
      <Box
        sx={{
          marginTop: "10rem",
        }}
      >
        <Login title="Customer Portal" />
      </Box>
    </Container>
  );
};

export default DashboardLoginPage;
