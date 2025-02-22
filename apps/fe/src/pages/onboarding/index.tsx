import {
  OrganizationForm,
  OrganizationFormValues,
} from "@/components/forms/organization";
import { Button } from "@/components/ui/button";
import { useCreateOrganizationMutation } from "@/hooks/tanstack/mutations/organization/create-organization";
import { ApplicationUrls } from "@/libs/router-dom";
import { useCallback, useId } from "react";
import { useNavigate } from "react-router-dom";

const OnboardingPage = () => {
  const navigate = useNavigate();
  const formId = useId();

  const { mutateAsync: onboarding, error } = useCreateOrganizationMutation();

  const onboardingHandler = useCallback(
    async (values: OrganizationFormValues) => {
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
        <OrganizationForm
          id={formId}
          onSubmit={onboardingHandler}
          error={error?.message || undefined}
          className="mt-4"
        />

        <Button form={formId} type="submit" className="mt-4">
          Complete onboarding
        </Button>
      </section>
    </main>
  );
};

export default OnboardingPage;
