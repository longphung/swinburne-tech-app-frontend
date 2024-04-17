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
    const {userData} = jwtDecode(result.data.idToken);
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
   * Checking both the idToken and accessToken in the localStorage just to be sure
   */
  check: async () => {
    const idToken = localStorage.getItem("idToken");
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    // No tokens available
    if (!idToken || !accessToken || !refreshToken) {
      return {
        authenticated: false,
        error: {
          message: "Not authenticated",
          name: "Not authenticated",
        },
        logout: true,
        redirectTo: "/dashboard/login",
      };
    }
    const idTokenDecoded = jwtDecode(idToken);
    const accessTokenDecoded = jwtDecode(accessToken);
    // Tokens expired
    if (
      idTokenDecoded.exp * 1000 < Date.now() ||
      accessTokenDecoded.exp * 1000 < Date.now()
    ) {
      const newTokens = await refreshAccessToken(refreshToken);
      if (!newTokens.success) {
        return {
          authenticated: false,
          error: {
            message: newTokens.message,
            name: "Token refresh error",
          },
          redirectTo: "/login",
        };
      }
      localStorage.setItem("idToken", newTokens.data.idToken);
      localStorage.setItem("accessToken", newTokens.data.accessToken);
      localStorage.setItem("refreshToken", newTokens.data.refreshToken);
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
};

export default authProvider;
