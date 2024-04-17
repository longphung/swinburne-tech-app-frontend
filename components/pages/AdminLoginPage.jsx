import { Box, Container } from "@mui/material";

import Login from "@/components/Login";
import { USERS_ROLE } from "@/utils/authProvider";

const AdminLoginPage = () => {
  return (
    <Container maxWidth="xs" sx={{ padding: "2rem" }}>
      <Box
        sx={{
          marginTop: "10rem",
        }}
      >
        <Login title="Admin Portal" role={USERS_ROLE.TECHNICIAN} />
      </Box>
    </Container>
  );
};

export default AdminLoginPage;
