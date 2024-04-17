import { login, logout, refreshAccessToken } from "@/api/backend";
import { jwtDecode } from "jwt-decode";

export const USERS_ROLE = {
  ADMIN: "admin",
  TECHNICIAN: "technician",
  CUSTOMER: "customer",
};
/**
 * @type {import("@refinedev/core").AuthProvider}
 */
const authProvider = {
  /**
   * @param {{
   *   username: string;
   *   password: string;
   *   role: USERS_ROLE.TECHNICIAN | USERS_ROLE.CUSTOMER;
   * }} data
   */
  login: async (data) => {
    const result = await login({
      username: data.username,
      password: data.password,
    });
    if (!result.success) {
      return {
        success: false,
        error: {
          name: "Login Error",
          message: result.message,
        },
      };
    }
    const { userData } = jwtDecode(result.data.idToken);
    if (
      !userData.role.includes(data.role) &&
      !userData.role.includes(USERS_ROLE.ADMIN)
    ) {
      return {
        success: false,
        error: {
          name: "Login Error",
          message: `You are not a ${data.role}`,
        },
      };
    }
    console.log("userData", userData);
    localStorage.setItem("idToken", result.data.idToken);
    localStorage.setItem("accessToken", result.data.accessToken);
    localStorage.setItem("refreshToken", result.data.refreshToken);
    return {
      success: true,
      error: null,
      successNotification: {
        message: `Login successful. Welcome ${userData.username}!`,
      },
    };
  },
  /**
   * Checking both the idToken expiration
   * @param {USERS_ROLE.TECHNICIAN & USERS_ROLE.CUSTOMER} role
   */
  check: async (role) => {
    const idToken = localStorage.getItem("idToken");
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const redirectTo =
      role === USERS_ROLE.CUSTOMER ? "/dashboard/login" : "/admin/login";
    // No tokens available
    if (!idToken || !accessToken || !refreshToken) {
      return {
        authenticated: false,
        error: {
          message: "Not logged in",
          name: "Not logged in"
        },
        redirectTo: redirectTo,
      };
    }
    const { userData } = jwtDecode(idToken);
    // Inappropriate role
    if (
      !userData.role.includes(role) &&
      !userData.role.includes(USERS_ROLE.ADMIN)
    ) {
      return {
        authenticated: false,
        error: {
          message: `You are not a ${role}`,
          name: "Role error",
        },
        logout: true,
        redirectTo: redirectTo,
      };
    }
    return {
      authenticated: true,
      error: null,
    };
  },
  logout: async () => {
    // Request server to invalidate all refresh token, but it is safe to just remove the tokens from the localStorage
    await logout(localStorage.getItem("refreshToken"));
    localStorage.removeItem("idToken");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    return {
      success: true,
      error: null,
      redirectTo: "/",
      successNotification: {
        message: "Logout successful",
      },
    };
  },
  onError: (error) => {
    console.error(error);
  },
  getIdentity: () => {
    const idToken = localStorage.getItem("idToken");
    if (!idToken) {
      return {
        id: null,
        fullName: null,
        email: null,
        emailVerified: null,
        phone: null,
        address: null,
        role: [],
      };
    }
    const { userData } = jwtDecode(idToken);
    return {
      id: userData._id,
      username: userData.username,
      email: userData.email,
      emailVerified: userData.emailVerified,
      phone: userData.phone,
      address: userData.address,
      role: userData.role,
    };
  },
};

export default authProvider;
