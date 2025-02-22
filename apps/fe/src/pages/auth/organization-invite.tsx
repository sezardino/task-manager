import {
  RegistrationForm,
  RegistrationFormValues,
} from "@/components/forms/registration";
import { Button } from "@/components/ui/button";
import { useProcessOrganizationInviteMutation } from "@/hooks/tanstack/mutations/organization-invites/process";
import { useVerifyOrganizationInvitesQuery } from "@/hooks/tanstack/query/organization-invites/verify-organization-invite";
import { ApplicationSearchParams, ApplicationUrls } from "@/libs/router-dom";
import { useCallback, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

type InviteStep = "decision" | "registration";

const OrganizationInvitePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState<InviteStep>("decision");

  const token = searchParams.get(ApplicationSearchParams.inviteToken);

  const { data } = useVerifyOrganizationInvitesQuery({ token: token! });
  const { mutateAsync: process, error } =
    useProcessOrganizationInviteMutation();

  const declineHandler = useCallback(async () => {
    if (!token) return;

    try {
      await process({ accept: false, token });

      navigate(ApplicationUrls.landing.index);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const processHandler = useCallback(
    async (values: RegistrationFormValues) => {
      if (!token) return;

      try {
        const response = await process({
          accept: true,
          token,
          email: values.email,
          password: values.password,
        });

        const redirectURL = new URL(
          ApplicationUrls.auth.login,
          window.location.origin
        );
        redirectURL.searchParams.set(
          ApplicationSearchParams.loginEmail,
          response.email
        );

        navigate(redirectURL.pathname + redirectURL.search);
      } catch (error) {
        console.log(error);
      }
    },
    [navigate, process, token]
  );

  if (!token) {
    navigate(ApplicationUrls.landing.index);
    return null;
  }

  const owner =
    data?.owner.firstName && data.owner.lastName
      ? `${data.owner.firstName} ${data.owner.lastName}`
      : data?.owner.email;

  return (
    <main>
      <header className="mb-6 flex flex-col items-center">
        <h1 className="mb-2 text-2xl font-bold text-center">
          You are invited to organization{" "}
          <span className="text-primary">{data?.name}</span>
        </h1>
        <p className="text-muted-foreground text-center">
          {owner} wont to se you in his organization
        </p>
      </header>

      {step === "decision" && (
        <section>
          <div className="flex items-center gap-4">
            <Button
              variant={"destructive"}
              className="w-full"
              onClick={declineHandler}
            >
              Decline
            </Button>
            <Button className="w-full" onClick={() => setStep("registration")}>
              Accept
            </Button>
          </div>

          {error?.message && (
            <p className="text-sm text-center text-destructive">
              {error.message}
            </p>
          )}
        </section>
      )}

      {step === "registration" && (
        <section>
          <RegistrationForm onSubmit={processHandler} />
        </section>
      )}
    </main>
  );
};

export default OrganizationInvitePage;
