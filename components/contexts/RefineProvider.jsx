"use client";

import routerProvider from "@refinedev/nextjs-router";
import { Refine } from "@refinedev/core";

import { login, refreshAccessToken } from "@/api/backend";
import { jwtDecode } from "jwt-decode";

/**
 * @type {AuthProvider}
 */
const authProvider = {
  login: async (data) => {
    const result = await login({
      username: data.username,
      password: data.password,
    });
    if (result.success) {
      localStorage.setItem("idToken", result.data.idToken);
      localStorage.setItem("accessToken", result.data.accessToken);
      localStorage.setItem("refreshToken", result.data.refreshToken);
    }
    return {
      success: result.success,
      data: result.data,
      error: {
        name: "Login Error",
        message: result.message || "",
      },
    };
  },
  /**
   * Checking both the idToken and accessToken in the localStorage just to be sure
   * @param data
   * @returns {Promise<{authenticated: boolean, error: null}|{authenticated: boolean, logout: boolean, redirectTo: string, error: {name: string, message: string}}>}
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
        redirectTo: "/login",
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
        localStorage.setItem("idToken", newTokens.idToken);
        localStorage.setItem("accessToken", newTokens.accessToken);
        localStorage.setItem("refreshToken", newTokens.refreshToken);
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
          logout: true,
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

const RefineProviderComponent = (props) => (
  <Refine routerProvider={routerProvider} authProvider={authProvider}>
    {props.children}
  </Refine>
);

export default RefineProviderComponent;
