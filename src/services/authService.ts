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
