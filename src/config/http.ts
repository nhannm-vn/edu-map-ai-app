import type {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";
import axios, { HttpStatusCode } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

class Http {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL:
        process.env.EXPO_PUBLIC_API_URL || "https://api.edumap.ai/api/v1",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Request Interceptor: Gắn AccessToken vào Header
    this.instance.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        const accessToken = await AsyncStorage.getItem("accessToken");
        if (accessToken && config.headers) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error: unknown) => Promise.reject(error),
    );

    // Response Interceptor: Xử lý lỗi tập trung
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error: AxiosError<{ message?: string }>) => {
        if (error.response?.status === HttpStatusCode.Unauthorized) {
          await AsyncStorage.removeItem("accessToken");
        }
        return Promise.reject(error);
      },
    );
  }
}

const http = new Http().instance;
export default http;
