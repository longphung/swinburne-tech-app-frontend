import { jwtDecode, JwtPayload } from "jwt-decode";
import { UserData, USERS_ROLE } from "@/interfaces";
import { CanParams } from "@refinedev/core";

export const customerFields = ["noteCustomer", "location"];
export const technicianFields = ["status", "noteTechnician", "urgency", "location"];
export const techniciansNoAccess = ["orders", "users"];

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
  if (resource === "orders" && action === "list") {
    return {
      can: true,
      reason: "Customer can list orders",
    };
  }
  if (resource === "orders" && action === "show") {
    return {
      can: true,
      reason: "Customer can see their orders",
    };
  }
  return {
    can: false,
    reason: "Unknown action",
  };
};

const handleTechnicianAccess = ({ resource, action, params }: CanParams) => {
  if (techniciansNoAccess.includes(resource!)) {
    return {
      can: false,
      reason: "Technician can't access",
    };
  }
  if (resource === "services" && action === "list") {
    return {
      can: true,
      reason: "Technician can list services",
    };
  }
  if (
    ["completion-slas", "response-slas", "services"].includes(resource!) &&
    ["edit", "create", "delete"].includes(action)
  ) {
    return {
      can: false,
      reason: "Technician can't edit or delete",
    };
  }
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
