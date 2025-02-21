import { OnboardingApiService } from "@/api/onboarding";
import { OnboardingInput } from "@/api/onboarding/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useOnboardingMutation = () =>
  useMutation({
    mutationFn: (input: OnboardingInput) =>
      OnboardingApiService.onboarding(input),
    onSuccess: () => toast.success("Onboarding successfully completed."),
  });
