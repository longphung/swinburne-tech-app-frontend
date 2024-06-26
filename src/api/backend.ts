import axios from "axios";

export const beInst = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

let isRefreshing = false;
const refreshSubscribers: Array<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resolve: (value: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reject: (reason?: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config: any;
}> = [];

beInst.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

beInst.interceptors.response.use(null, async (error) => {
  if (error.response.status !== 401) {
    return Promise.reject(error);
  }
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) {
    return Promise.reject(error);
  }
  if (isRefreshing) {
    return new Promise((resolve, reject) =>
      refreshSubscribers.push({
        resolve,
        reject,
        config: error.config,
      }),
    );
  }
  isRefreshing = true;
  const result = await refreshAccessToken(refreshToken);
  if (!result.success || !result.data) {
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

export const login = async ({ username, password }: { username: string; password: string }) => {
  const result = await beInst.post<{
    idToken: string;
    accessToken: string;
    refreshToken: string;
    expiresIn: string;
  }>("/auth/login/password", {
    username,
    password,
  });
  return result.data;
};

export const refreshAccessToken = async (refreshToken: string) => {
  try {
    const result = await beInst.post<{
      idToken: string;
      accessToken: string;
      refreshToken: string;
      expiresIn: string;
    }>("/auth/token", {
      refreshToken,
    });
    return {
      success: true,
      data: result.data,
    };
  } catch (e) {
    if (!axios.isAxiosError(e))
      return {
        success: false,
      };
    if (!e.response)
      return {
        success: false,
      };
    return {
      success: false,
      message: e.message,
    };
  }
};

export const logout = async (refreshToken: string): Promise<{ success: boolean; message?: string }> => {
  try {
    await beInst.put("/auth/token", {
      refreshToken,
    });
    return {
      success: true,
    };
  } catch (e) {
    if (!axios.isAxiosError(e))
      return {
        success: false,
      };
    if (!e.response)
      return {
        success: false,
      };
    return {
      success: false,
      message: e.message,
    };
  }
};

export const register = async (data: {
  username: string;
  password: string;
  email: string;
  phone: string;
  address: string;
  // TODO: change to enum
  role: "technician" | "customer";
}) => {
  const result = await beInst.post("/auth/signup", data);
  return result.data;
};

export const sendConfirmationEmail = async (username: string) => {
  const result = await beInst.post("/auth/resend-confirmation-email", {
    username,
  });
  return result.data;
};

export const sendForgotPasswordEmail = async (email: string) => {
  const result = await beInst.post("/auth/forgot-password", {
    email,
  });
  return result.data;
};

export const resetPassword = async (data: { token: string; password: string }) => {
  const result = await beInst.post("/auth/reset-password", data);
  return result.data;
};

export const getUsersServiceList = async () => {
  const result = await beInst.get("/services");
  return result.data;
};

export const getOrderPDFInvoice = async (orderId: string) => {
  const result = await beInst.get(`/orders/pdf/${orderId}`, {
    responseType: "blob",
  });
  return window.URL.createObjectURL(result.data);
};

export const getTechnicianReport = async () => {
  const result = await beInst.get<
    {
      _id: string;
      technician: { name: string };
      tickets: [number];
      completedTickets: number;
    }[]
  >("/reports/technicians");
  return result.data;
};

export const getRevenueReport = async () => {
  const result = await beInst.get<
    Array<{
      _id: string;
      total: { $numberDecimal: number };
      tickets: Array<
        Array<{
          _id: string;
          serviceId: string;
          status: string;
          cost: { $numberDecimal: number };
        }>
      >;
    }>
  >("/reports/revenue");
  return result.data;
};
