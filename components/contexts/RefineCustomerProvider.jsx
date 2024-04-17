"use client";

import routerProvider from "@refinedev/nextjs-router";
import { Refine } from "@refinedev/core";

import { login, refreshAccessToken } from "@/api/backend";
import { jwtDecode } from "jwt-decode";

/**
 * @type {import("@refinedev/core").AuthProvider}
 */
const authProvider = {
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
    if (!userData.role.includes("customer")) {
      return {
        success: false,
        error: {
          name: "Login Error",
          message: "You are not a customer",
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
   * @param data
   */
  check: async (data) => {
    const idToken = localStorage.getItem("idToken");
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
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
    if (
      idTokenDecoded.exp * 1000 < Date.now() ||
      accessTokenDecoded.exp * 1000 < Date.now()
    ) {
      try {
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
        return {
          authenticated: true,
          error: null,
        };
      } catch (e) {
        console.error(e);
        return {
          authenticated: false,
          error: {
            message: "Token expired",
            name: "Token expired",
          },
          redirectTo: "/login",
        };
      }
    }
    return {
      authenticated: true,
      error: null,
    };
  },
};

const RefineCustomerProvider = (props) => (
  <Refine routerProvider={routerProvider} authProvider={authProvider}>
    {props.children}
  </Refine>
);

export default RefineCustomerProvider;
