import { jwtDecode } from "jwt-decode";
import { USERS_ROLE } from "@/utils/authProvider";

/**
 * @type {import("@refinedev/core").AccessControlProvider}
 */
const accessControlProvider = {
  can: async ({ resource }) => {
    const idToken = localStorage.getItem("idToken");
    if (!idToken) {
      return {
        can: false,
        reason: "You are not logged in.",
      };
    }
    const { userData } = jwtDecode(idToken);
    if (userData.role.includes(USERS_ROLE.ADMIN)) {
      return {
        can: true,
      };
    }
    if (
      userData.role.includes(USERS_ROLE.TECHNICIAN) &&
      resource === USERS_ROLE.TECHNICIAN
    ) {
      return {
        can: true,
      };
    }
    if (
      userData.role.includes(USERS_ROLE.CUSTOMER) &&
      resource === USERS_ROLE.CUSTOMER
    ) {
      return {
        can: true,
      };
    }
    return {
      can: false,
      reason: "You are not authorized to perform this action.",
    };
  },
  options: {
    buttons: {
      enableAccessControl: true,
    },
  },
};

export default accessControlProvider;
