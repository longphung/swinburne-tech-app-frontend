"use client";

import { Typography } from "@mui/material";
import { CanAccess } from "@refinedev/core";

import { USERS_ROLE } from "@/utils/authProvider";

const DashboardPage = () => {
  return (
    <CanAccess resource={USERS_ROLE.CUSTOMER}>
      <Typography>Dashboard Page</Typography>
    </CanAccess>
  );
};

export default DashboardPage;
