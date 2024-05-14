import { jwtDecode, JwtPayload } from "jwt-decode";
import { UserData, USERS_ROLE } from "@/interfaces";
import { CanParams } from "@refinedev/core";

export const customerFields = ["note", "location"];
export const technicianFields = ["assignedTo", "status", "note", "urgency", "location"];

const handleCustomerAccess = ({ resource, action, params }: CanParams) => {
  if (resource === "tickets" && action === "edit") {
    if (params?.field) {
      return { can: customerFields.includes(params?.field), reason: "Customer can only edit note and location" };
    }
    return {
      can: true,
      reason: "Customer can edit tickets",
    };
  }
  if (resource === "tickets" && action === "list") {
    return {
      can: true,
      reason: "Customer can list tickets",
    };
  }
  return {
    can: false,
    reason: "Unknown action",
  };
};

const handleTechnicianAccess = ({ resource, action, params }: CanParams) => {
  if (resource === "tickets" && action === "edit") {
    if (params?.field) {
      return {
        can: technicianFields.includes(params?.field),
        reason: "Technician can only edit assignedTo, status, note, urgency, and location",
      };
    }
    return {
      can: true,
      reason: "Technician can edit tickets",
    };
  }
  return {
    can: true,
    reason: "Technician can do anything",
  };
};

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
      if (role.includes(USERS_ROLE.ADMIN)) {
        return {
          can: true,
          reason: "Admin can do anything",
        };
      } else if (role.includes(USERS_ROLE.TECHNICIAN)) {
        return handleTechnicianAccess(params);
      } else if (role.includes(USERS_ROLE.CUSTOMER)) {
        return handleCustomerAccess(params);
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
