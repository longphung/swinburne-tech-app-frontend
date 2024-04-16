import axios from "axios";

const beInst = axios.create({
  baseURL: "/api",
});

/**
 * @param {string} username
 * @param {string} password
 * @returns {Promise<{
 * success: boolean,
 * message?: string,
 * data?: {
 *  idToken: string,
 *  accessToken: string,
 *  refreshToken: string,
 *  expiresIn: string,
 * }}>}
 */
export const login = async ({ username, password }) => {
  try {
    const result = await beInst.post("/auth/login/password", {
      username,
      password,
    });
    return {
      success: true,
      data: result.data,
    };
  } catch (e) {
    if (e.response.status === 401) {
      return {
        success: false,
        message: "Invalid username or password",
      };
    }
    return {
      success: false,
      message: e.response.data.message,
    };
  }
};

export const refreshAccessToken = async (refreshToken) => {
  try {
    const result = await beInst.post("/auth/token", {
      refreshToken
    });
    return {
      success: true,
      data: result.data,
    };
  } catch (e) {
    return {
      success: false,
      message: e.response.data.message,
    };
  }
}
