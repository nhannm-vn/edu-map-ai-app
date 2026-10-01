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

export interface TopSkillItem {
  id: string;
  userId: string;
  skillId: string;
  proficiencyLevel: number;
  hoursSpent: number;
  verifiedByGithub: boolean;
  createdAt: string;
  skill: {
    id: string;
    name: string;
    category: string;
    difficultyLevel: number;
    demandScore: number;
    createdAt: string;
  };
}

export interface SkillSummaryData {
  totalSkills: number;
  totalHours: number;
  topSkills: TopSkillItem[];
  categoryStats: Record<string, number>;
}

export interface SkillSummaryResponse {
  success: boolean;
  statusCode: number;
  data?: SkillSummaryData;
  message?: string;
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

export const getSkillSummaryApi = async (
  token: string,
): Promise<SkillSummaryResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/v1/skills/my-skills/summary`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data: SkillSummaryResponse = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(
      error?.message || "Không thể lấy dữ liệu thống kê kỹ năng.",
    );
  }
};
