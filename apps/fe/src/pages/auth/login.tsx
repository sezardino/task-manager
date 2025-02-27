import { LoginForm, LoginFormValues } from "@/components/forms/login";
import { useLoginMutation } from "@/hooks/tanstack/mutations/auth/login";
import { ApplicationSearchParams, ApplicationUrls } from "@/libs/router-dom";
import { useCallback } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { mutateAsync: login, error } = useLoginMutation();

  const loginHandler = useCallback(
    async (values: LoginFormValues) => {
      try {
        const response = await login(values);

        let redirectUrl = ApplicationUrls.application.index;

        if (response.onboarding) redirectUrl = ApplicationUrls.onboarding.index;

        navigate(redirectUrl);
      } catch (e) {
        console.error(e);
      }
    },
    [login, navigate]
  );

  return (
    <main>
      <header className="mb-6 flex flex-col items-center">
        <h1 className="mb-2 text-2xl font-bold">Log in with your login</h1>
        <p className="text-muted-foreground">Enter your information to login</p>
      </header>

      <LoginForm
        onSubmit={loginHandler}
        initialValues={{
          email:
            searchParams.get(ApplicationSearchParams.loginEmail) || undefined,
        }}
        error={error?.message || undefined}
      />

      <p className="text-center my-5">or</p>

      {/* TODO: add google 0Auth */}

      <footer className="mx-auto mt-8 flex justify-center gap-1 text-sm text-muted-foreground">
        <p>Don't have an account?</p>
        <Link
          to={ApplicationUrls.auth.registration}
          className="font-medium text-primary"
        >
          Register
        </Link>
      </footer>
    </main>
  );
};

export default LoginPage;
