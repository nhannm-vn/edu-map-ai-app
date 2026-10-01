import { useMutation } from "@tanstack/react-query";
import { authRepo } from "../repository/auth.repo";
import type { LoginPayload, RegisterFormPayload } from "../schemas/auth.schema";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (payload: LoginPayload) => authRepo.login(payload),
  });
};

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: (payload: Omit<RegisterFormPayload, "confirmPassword">) =>
      authRepo.register(payload),
  });
};
