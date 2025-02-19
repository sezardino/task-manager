import { Spinner } from "@/components/ui/spinner";
import { AuthLayout } from "@/layouts/auth";
import { lazy, Suspense } from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import { getFromCacheOrFetch } from "../react-query";
import { ApplicationUrls } from "./const";
import { currentUserQuery } from "@/hooks/tanstack/query/user/current-user";

const LoginPage = lazy(() => import("@/pages/auth/login"));

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
        path: ApplicationUrls.landing.index,
        Component: () => <h1>Landing</h1>,
      },
      {
        path: ApplicationUrls.auth.index,
        Component: () => (
          <AuthLayout>
            <Outlet />
          </AuthLayout>
        ),
        children: [
          { path: ApplicationUrls.auth.index, Component: LoginPage },
          { path: ApplicationUrls.auth.login, Component: LoginPage },
          {
            path: ApplicationUrls.auth.registration,
            Component: () => <h1>Auth</h1>,
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
