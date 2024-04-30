import { jwtDecode, JwtPayload } from "jwt-decode";
import { UserData, USERS_ROLE } from "@/interfaces";
import { CanParams } from "@refinedev/core";

/**
 * This only applies to the dashboard side of the application, we are only using CanAccess to check if the user can access parts of the dashboard
 */
const accessControlProvider = {
  // eslint-disable-next-line max-lines-per-function
  can: async (
    params: CanParams,
  ): Promise<{
    can: boolean;
    reason: string;
  }> => {
    const pathname = window.location.pathname;
    if (!pathname.startsWith("/dashboard")) {
      return {
        can: true,
        reason: "hehe it's public",
      };
    }
    const idToken = localStorage.getItem("idToken");
    if (!idToken) {
      return {
        can: false,
        reason: "No token found",
      };
    }
    try {
      const {
        userData: { role },
      }: JwtPayload & {
        userData: UserData;
      } = jwtDecode(idToken);
      for (const r of role) {
        switch (r) {
          case USERS_ROLE.ADMIN: {
            return {
              can: true,
              reason: "Admin can do anything",
            };
          }
          case USERS_ROLE.CUSTOMER: {
            // NOTE: There are some resources that customers can access, but not implemented yet
            return {
              can: false,
              reason: "Customer cannot access this resource",
            };
          }
          case USERS_ROLE.TECHNICIAN: {
            return {
              can: true,
              reason: "Technician can do anything (for now...)",
            };
          }
        }
      }
      return {
        can: false,
        reason: "Unknown role",
      };
    } catch (e) {
      console.error(e);
      return {
        can: false,
        reason: "Invalid token",
      };
    }
  },
  options: {
    buttons: {
      enableAccessControl: true,
      hideIfUnauthorized: true,
    },
    queryOptions: {
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
};

export default accessControlProvider;
