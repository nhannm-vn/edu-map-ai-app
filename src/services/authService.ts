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

export interface PlanFeatures {
  pdfReport: boolean;
  skillTree: string;
  jobMatching: boolean;
  resumeReview: boolean;
  publicCourses: boolean;
  prioritySupport: boolean;
  publicPortfolio: boolean;
  communitySupport: boolean;
  hideEduMapBranding: boolean;
  priorityAiAnalysis: boolean;
}

export interface PlanLimits {
  aiChatPerDay: number;
  githubSyncPerDay: number;
  githubSyncPerWeek: number | null;
  pdfReportPerMonth: number;
  skillTreeMaxNodes: number;
  jobMatchingPerMonth: number;
  resumeReviewPerMonth: number;
  githubMaxRepositoriesPerSync: number;
  skillTreeGenerationsPerMonth: number;
}

export interface PlanItem {
  id: string;
  code: string;
  name: string;
  description: string;
  priceVnd: number;
  durationDays: number | null;
  features: PlanFeatures;
  limits: PlanLimits;
}

export interface BillingPlansResponse {
  success: boolean;
  statusCode: number;
  data?: PlanItem[];
  message?: string;
}

export interface LatestPayment {
  paymentId: string;
  orderCode: string;
  amountVnd: number;
  status: string;
  paidAt: string;
}

export interface MySubscriptionData {
  planCode: string;
  planName: string;
  status: string;
  startedAt: string;
  expiresAt: string;
  isActive: boolean;
  features: PlanFeatures;
  limits: PlanLimits;
  latestPayment?: LatestPayment;
}

export interface MySubscriptionResponse {
  success: boolean;
  statusCode: number;
  data?: MySubscriptionData;
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

export const getBillingPlansApi = async (
  token?: string,
): Promise<BillingPlansResponse> => {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${BASE_URL}/v1/billing/plans`, {
      method: "GET",
      headers,
    });
    return await response.json();
  } catch (error: any) {
    throw new Error(error?.message || "Không thể lấy danh sách gói dịch vụ.");
  }
};

export const getMySubscriptionApi = async (
  token: string,
): Promise<MySubscriptionResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/v1/billing/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error: any) {
    throw new Error(error?.message || "Không thể lấy thông tin gói hiện tại.");
  }
};
