import { AuthApiService } from "@/api/auth";
import { RegistrationInput } from "@/api/auth/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useRegistrationMutation = () =>
  useMutation({
    mutationFn: (input: RegistrationInput) =>
      AuthApiService.registration(input),
    onSuccess: () => toast.success("Successfully registered, please login now"),
  });
