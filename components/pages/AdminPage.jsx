import { Typography } from "@mui/material";
import { CanAccess } from "@refinedev/core";

import { USERS_ROLE } from "@/utils/authProvider";

const AdminPage = () => {
  return (
    <CanAccess resource={USERS_ROLE.TECHNICIAN}>
      <Typography>Dashboard Page</Typography>
    </CanAccess>
  );
};

export default AdminPage;
