"use client";

import { Authenticated, CanAccess } from "@refinedev/core";
import { USERS_ROLE } from "@/utils/authProvider";

const DashboardLayout = ({ children }) => {
  return (
    <Authenticated
      v3LegacyAuthProviderCompatible={false}
      key="dashboard-layout"
    >
      <CanAccess
        resource={USERS_ROLE.CUSTOMER}
        onUnauthorized={() => {
          console.log("Unauthorized");
        }}
        fallback={
          <div>
            <h1>Unauthorized</h1>
          </div>
        }
      >
        {children}
      </CanAccess>
    </Authenticated>
  );
};

export default DashboardLayout;
