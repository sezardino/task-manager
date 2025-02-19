import { LoginForm, LoginFormValues } from "@/components/forms/login";
import { useLoginMutation } from "@/hooks/tanstack/mutations/auth/login";
import { useCurrentUserQuery } from "@/hooks/tanstack/query/user/current-user";
import { ApplicationUrls } from "@/libs/router-dom";
import { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  useCurrentUserQuery();

  const { mutateAsync: login } = useLoginMutation();

  const loginHandler = useCallback(
    async (values: LoginFormValues) => {
      try {
        await login(values);
        navigate(ApplicationUrls.application.index);
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

      <LoginForm onSubmit={loginHandler} />

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
