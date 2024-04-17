import { Box, Container } from "@mui/material";
import Login from "@/components/Login";
import { USERS_ROLE } from "@/utils/authProvider";

const DashboardLoginPage = () => {
  return (
    <Container maxWidth="xs" sx={{ padding: "2rem" }}>
      <Box
        sx={{
          marginTop: "10rem",
        }}
      >
        <Login title="Customer Portal" role={USERS_ROLE.CUSTOMER} />
      </Box>
    </Container>
  );
};

export default DashboardLoginPage;
