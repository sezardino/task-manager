import {
  OnboardingForm,
  OnboardingFormValues,
} from "@/components/forms/onboarding";
import { useOnboardingMutation } from "@/hooks/tanstack/mutations/onboarding/onboarding";
import { ApplicationUrls } from "@/libs/router-dom";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const OnboardingPage = () => {
  const navigate = useNavigate();

  const { mutateAsync: onboarding, error } = useOnboardingMutation();

  const onboardingHandler = useCallback(
    async (values: OnboardingFormValues) => {
      try {
        const response = await onboarding(values);

        navigate(ApplicationUrls.application.organization.index(response.id));
      } catch (e) {
        console.error(e);
      }
    },
    [onboarding, navigate]
  );

  return (
    <main className="w-full max-w-sm">
      <header className="mb-6 flex flex-col items-center">
        <h1 className="text-2xl font-bold">Your journey start here </h1>
      </header>

      <section className="mt-2 mx-auto rounded-md p-6 shadow">
        <h2 className="text-lg font-bold text-center">
          Enter organization information
        </h2>
        <OnboardingForm
          onSubmit={onboardingHandler}
          error={error?.message || undefined}
          className="mt-4"
        />
      </section>
    </main>
  );
};

export default OnboardingPage;
