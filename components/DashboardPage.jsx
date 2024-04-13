"use client";

import Login from "@/components/Login";
import { Box, Container } from "@mui/material";

const DashboardPage = () => {
  return (
    <Container maxWidth="xs" sx={{ padding: "2rem" }}>
      <Box
        sx={{
          marginTop: "10rem",
        }}
      >
        <Login
          title="Customer Portal"
        />
      </Box>
    </Container>
  );
};

export default DashboardPage;
