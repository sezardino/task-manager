import { AuthApiService } from "@/api/auth";
import { LoginInput } from "@/api/auth/types";
import { TokensService } from "@/services/tokens";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { CURRENT_USER_QUERY_KEY } from "../../query/user/current-user";

export const useLoginMutation = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (input: LoginInput) => AuthApiService.login(input),
    onSuccess: (payload) => {
      const { accessToken, refreshToken } = payload;

      TokensService.setTokens(accessToken, refreshToken);

      client.invalidateQueries({ queryKey: [CURRENT_USER_QUERY_KEY] });
      toast.success("Successful login");
    },
  });
};
