"use client";

import { Authenticated, CanAccess } from "@refinedev/core";
import { USERS_ROLE } from "@/utils/authProvider";

const AdminLayout = ({ children }) => {
  return (
    <Authenticated v3LegacyAuthProviderCompatible={false} key="admin-layout">
      <CanAccess
        resource={USERS_ROLE.TECHNICIAN}
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

export default AdminLayout;
