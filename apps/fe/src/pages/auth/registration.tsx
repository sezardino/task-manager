import {
  RegistrationForm,
  RegistrationFormValues,
} from "@/components/forms/registration";
import { useRegistrationMutation } from "@/hooks/tanstack/mutations/user/register";
import { ApplicationSearchParams, ApplicationUrls } from "@/libs/router-dom";
import { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

const RegistrationPage = () => {
  const navigate = useNavigate();

  const { mutateAsync: registration, error } = useRegistrationMutation();

  const registrationHandler = useCallback(
    async (values: RegistrationFormValues) => {
      try {
        const response = await registration({
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
      } catch (e) {
        console.error(e);
      }
    },
    [registration, navigate]
  );

  return (
    <main>
      <header className="mb-6 flex flex-col items-center">
        <h1 className="mb-2 text-2xl font-bold">Start your free trial</h1>
        <p className="text-muted-foreground">Sign up in less than 2 minutes.</p>
      </header>

      <RegistrationForm onSubmit={registrationHandler} error={error?.message} />
      {/* TODO: add registration by Google */}
      <footer className="mx-auto mt-8 flex justify-center gap-1 text-sm text-muted-foreground">
        <p>Already have an account?</p>
        <Link
          to={ApplicationUrls.auth.login}
          className="font-medium text-primary"
        >
          Log in
        </Link>
      </footer>
    </main>
  );
};

export default RegistrationPage;
