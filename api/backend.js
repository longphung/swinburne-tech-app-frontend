import axios from "axios";

const beInst = axios.create({
  baseURL: "/api",
});

let isRefreshing = false;
const refreshSubscribers = [];

beInst.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

beInst.interceptors.response.use(null, async (error) => {
  if (error.status !== 401) {
    return Promise.reject(error);
  }
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) {
    return Promise.reject(error);
  }
  if (isRefreshing) {
    return new Promise((resolve, reject) =>
      refreshSubscribers.push(() => ({
        resolve,
        reject,
        config: beInst(error.config),
      })),
    );
  }
  isRefreshing = true;
  const result = await refreshAccessToken(refreshToken);
  if (!result.success) {
    isRefreshing = false;
    return Promise.reject(error);
  }
  localStorage.setItem("idToken", result.data.idToken);
  localStorage.setItem("accessToken", result.data.accessToken);
  localStorage.setItem("refreshToken", result.data.refreshToken);
  error.config.headers.Authorization = `Bearer ${result.data.accessToken}`;
  refreshSubscribers.forEach(({ resolve, reject, config }) => {
    config.headers.Authorization = `Bearer ${result.data.accessToken}`;
    beInst.request(config).then(resolve).catch(reject);
  });
  refreshSubscribers.length = 0;
  isRefreshing = false;
  return beInst(error.config);
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
      refreshToken,
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
};

/**
 * Request server to invalidate all refresh tokens for the user
 * @param refreshToken
 * @returns {Promise<{success: boolean}>}
 */
export const logout = async (refreshToken) => {
  try {
    await beInst.put("/auth/token", {
      refreshToken,
    });
    return {
      success: true,
    };
  } catch (e) {
    return {
      success: false,
      message: e.response.data.message,
    };
  }
};

/**
 * @param {{
 *   username: string,
 *   password: string,
 *   email: string,
 *   phone: string,
 *   address: string,
 *   role: USERS_ROLE.TECHNICIAN | USERS_ROLE.CUSTOMER,
 * }} data
 * @returns {Promise<void>}
 */
export const register = async (data) => {
  const result = await beInst.post("/auth/signup", data);
  return result.data;
};
