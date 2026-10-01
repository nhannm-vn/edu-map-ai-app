import http from "../config/http";
import type { LoginPayload, RegisterFormPayload } from "../schemas/auth.schema";

class AuthRepository {
  private readonly PREFIX = "/auth";

  login(payload: LoginPayload) {
    return http.post(`${this.PREFIX}/login`, payload);
  }

  register(payload: Omit<RegisterFormPayload, "confirmPassword">) {
    return http.post(`${this.PREFIX}/register`, payload);
  }

  getMe() {
    return http.get(`${this.PREFIX}/me`);
  }
}

export const authRepo = new AuthRepository();
