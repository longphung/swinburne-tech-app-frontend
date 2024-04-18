import { login, logout, register } from "@/api/backend";

import { jwtDecode, JwtPayload } from "jwt-decode";
import { AuthProvider } from "@refinedev/core";
import { AxiosError, isAxiosError } from "axios";

export const enum USERS_ROLE {
  ADMIN = "admin",
  TECHNICIAN = "technician",
  CUSTOMER = "customer",
}

const authProvider: AuthProvider = {
  login: async (data: {
    username: string;
    password: string;
    role: USERS_ROLE.TECHNICIAN | USERS_ROLE.CUSTOMER;
  }) => {
    console.log('data', data)
    try {
      const result = await login({
        username: data.username,
        password: data.password,
      });
      const {
        userData,
      }: JwtPayload & {
        userData: {
          username: string;
          role: USERS_ROLE.TECHNICIAN | USERS_ROLE.CUSTOMER;
        };
      } = jwtDecode(result.idToken || "");
      localStorage.setItem("idToken", result.idToken || "");
      localStorage.setItem("accessToken", result.accessToken || "");
      localStorage.setItem("refreshToken", result.refreshToken || "");
      return {
        success: true,
        successNotification: {
          message: `Login successful. Welcome ${userData.username}!`,
        },
      };
    } catch (e) {
      if (!isAxiosError(e) || !e.response) {
        return {
          success: false,
          error: e as Error,
        };
      }
      return {
        success: false,
        error: {
          name: "Login Error",
          message: e.message,
        },
      };
    }
  },
  /**
   * Checking both the idToken expiration
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
          message: "Not logged in",
          name: "Not logged in",
        },
      };
    }
    return {
      authenticated: true,
    };
  },
  logout: async () => {
    // Request server to invalidate all refresh token, but it is safe to just remove the tokens from the localStorage
    await logout(localStorage.getItem("refreshToken") || "");
    localStorage.removeItem("idToken");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    return {
      success: true,
      redirectTo: "/",
      successNotification: {
        message: "Logout successful",
      },
    };
  },
  onError: async (error: AxiosError) => {
    console.error(error);
    if (error.status === 401 || error.status === 403) {
      return {
        logout: true,
        error,
      };
    }
    return {
      error: {
        name: "API Error",
        message: "An error occurred during authentication",
      },
    };
  },
  register: async (data: {
    username: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    role: USERS_ROLE.TECHNICIAN & USERS_ROLE.CUSTOMER;
  }) => {
    try {
      const result = await register(data);
      console.log("userId", result);
      return {
        success: true,
        successNotification: {
          message: "Confirmation email sent",
          description: "Please confirm your email to login.",
        },
      };
    } catch (e) {
      return {
        success: false,
        error: {
          name: "Register Error",
          message: (e as Error).message,
        },
      };
    }
  },
  getIdentity: async () => {
    const idToken = localStorage.getItem("idToken");
    if (!idToken) {
      return {
        id: null,
        fullName: null,
        email: null,
        emailVerified: null,
        phone: null,
        address: null,
        role: null,
      };
    }
    const {
      userData,
    }: JwtPayload & {
      userData: {
        _id: string;
        username: string;
        email: string;
        emailVerified: boolean;
        phone: string;
        address: string;
        role: USERS_ROLE.TECHNICIAN | USERS_ROLE.CUSTOMER;
      };
    } = jwtDecode(idToken);
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
