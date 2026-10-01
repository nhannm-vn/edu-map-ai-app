export interface UserData {
  id: string;
  email: string;
  fullName: string;
  role: string;
}

export interface LoginResponse {
  success: boolean;
  statusCode: number;
  message?: string;
  data?: {
    accessToken: string;
    user: UserData;
  };
}

export interface RegisterData {
  email: string;
  password: string;
  fullName: string;
}

export interface RegisterResponse {
  success: boolean;
  statusCode: number;
  message?: string;
  data?: {
    user: {
      id: string;
      email: string;
      fullName: string;
      subscriptionTier?: string;
      createdAt?: string;
      role?: string;
    };
    accessToken: string;
  };
}

const BASE_URL = "https://edumapai.io.vn/api";

export const loginApi = async (
  email: string,
  password: string,
): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
      body: JSON.stringify({ email, password }),
    });

    const data: LoginResponse = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error?.message || "Không thể kết nối đến máy chủ.");
  }
};

export const registerApi = async (
  payload: RegisterData,
): Promise<RegisterResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/v1/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
      body: JSON.stringify(payload),
    });

    const data: RegisterResponse = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error?.message || "Không thể kết nối đến máy chủ.");
  }
};
