import { AuthApiService } from "@/api/auth";
import { LoginInput } from "@/api/auth/types";
import { TokensService } from "@/services/tokens";
import { useMutation } from "@tanstack/react-query";

export const useLoginMutation = () =>
  useMutation({
    mutationFn: (input: LoginInput) => AuthApiService.login(input),
    onSuccess: (payload) =>
      TokensService.setTokens(payload.accessToken, payload.refreshToken),
  });
