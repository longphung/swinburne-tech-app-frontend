import { jwtDecode } from "jwt-decode";

/**
 * @type {import("@refinedev/core").AccessControlProvider}
 */
const accessControlProvider = {
  can: async ({ resource, action, params }) => {
    const idToken = localStorage.getItem("idToken");
    if (!idToken) {
      return {
        can: false,
        reason: "You are not logged in.",
      };
    }
    const { userData } = jwtDecode(idToken);
    if (userData.role.includes("admin")) {
      return {
        can: true,
      };
    }
    if (userData.role.includes("technician") && resource === "technician") {
      return {
        can: true,
      };
    }
    if (userData.role.includes("customer") && resource === "customer") {
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
