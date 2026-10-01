import AsyncStorage from "@react-native-async-storage/async-storage";

export interface AuthSavePayload {
  accessToken: string;
  fullName?: string;
  role?: string;
  remember?: boolean;
}

export const saveAuthToLS = async (payload: AuthSavePayload) => {
  try {
    await AsyncStorage.setItem("accessToken", payload.accessToken);
    if (payload.fullName)
      await AsyncStorage.setItem("fullName", payload.fullName);
    if (payload.role) await AsyncStorage.setItem("role", payload.role);
  } catch (error) {
    console.error("Lỗi lưu auth storage:", error);
  }
};

export const clearLS = async () => {
  try {
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("fullName");
    await AsyncStorage.removeItem("role");
  } catch (error) {
    console.error("Lỗi xóa auth storage:", error);
  }
};

export const getAccessTokenFromLS = async () => {
  return await AsyncStorage.getItem("accessToken");
};
