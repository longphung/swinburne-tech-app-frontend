"use client";

import Login from "@/components/Login";
import { Box, Container } from "@mui/material";
import { useIsAuthenticated } from "@refinedev/core";

const DashboardPage = () => {
  const { isLoading, data } = useIsAuthenticated();

  console.log("authenticatedData", data);

  /**
   * Save the tokens to the local storage and redirect to the dashboard page.
   * @param {{
   *   idToken: string;
   *   accessToken: string;
   *   refreshToken: string;
   *   expiresIn: string;
   * }} data
   */
  const handleLogin = (data) => {
    // localStorage.setItem("idToken", data.idToken);
    // localStorage.setItem("accessToken", data.accessToken);
    // localStorage.setItem("refreshToken", data.refreshToken);
    // localStorage.setItem("expiresIn", data.expiresIn);
  };

  return (
    <Container maxWidth="xs" sx={{ padding: "2rem" }}>
      <Box
        sx={{
          marginTop: "10rem",
        }}
      >
        <Login title="Customer Portal" onLogin={handleLogin} />
      </Box>
    </Container>
  );
};

export default DashboardPage;
