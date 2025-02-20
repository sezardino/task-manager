import { Spinner } from "@/components/ui/spinner";
import { currentUserQuery } from "@/hooks/tanstack/query/user/current-user";
import { AuthLayout } from "@/layouts/auth";
import { lazy, Suspense } from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import { getFromCacheOrFetch } from "../react-query";
import { ApplicationUrls } from "./const";

const AuthPage = lazy(() => import("@/pages/auth/index"));
const LoginPage = lazy(() => import("@/pages/auth/login"));
const RegistrationPage = lazy(() => import("@/pages/auth/registration"));

const LandingPage = lazy(() => import("@/pages/landing/index"));

export const router = createBrowserRouter([
  {
    path: "/",
    loader: () => {
      getFromCacheOrFetch(currentUserQuery);
      return null;
    },
    element: (
      <Suspense
        fallback={
          <div className="w-full h-dvh flex">
            <Spinner className="w-20 h-20 m-auto" />
          </div>
        }
      >
        <Outlet />
      </Suspense>
    ),
    children: [
      {
        path: ApplicationUrls.auth.index,
        Component: () => (
          <AuthLayout>
            <Outlet />
          </AuthLayout>
        ),
        children: [
          { path: ApplicationUrls.auth.index, Component: AuthPage },
          { path: ApplicationUrls.auth.login, Component: LoginPage },
          {
            path: ApplicationUrls.auth.registration,
            Component: RegistrationPage,
          },
        ],
      },
      {
        path: ApplicationUrls.landing.index,
        Component: () => <Outlet />,
        children: [
          {
            path: ApplicationUrls.landing.index,
            Component: LandingPage,
          },
        ],
      },
      {
        path: ApplicationUrls.application.index,
        Component: () => <Outlet />,
        children: [
          {
            path: ApplicationUrls.application.index,
            Component: () => <h1>App</h1>,
          },
        ],
      },
    ],
  },
]);
