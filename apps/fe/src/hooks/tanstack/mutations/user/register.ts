import { AuthApiService } from "@/api/auth";
import { RegistrationInput } from "@/api/auth/types";
import { useMutation } from "@tanstack/react-query";

export const useRegistrationMutation = () =>
  useMutation({
    mutationFn: (input: RegistrationInput) =>
      AuthApiService.registration(input),
  });
