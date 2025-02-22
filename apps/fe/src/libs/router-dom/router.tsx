import { Spinner } from "@/components/ui/spinner";
import { currentUserQuery } from "@/hooks/tanstack/query/user/current-user";
import { AuthLayout } from "@/layouts/auth";
import { OnboardingLayout } from "@/layouts/onboarding";
import { OrganizationLayout } from "@/layouts/organization";
import { lazy, Suspense } from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import { getFromCacheOrFetch } from "../react-query";
import { ApplicationUrls } from "./const";

const AuthPage = lazy(() => import("@/pages/auth/index"));
const LoginPage = lazy(() => import("@/pages/auth/login"));
const RegistrationPage = lazy(() => import("@/pages/auth/registration"));
const OrganizationInvitePage = lazy(
  () => import("@/pages/auth/organization-invite")
);

const OnboardingPage = lazy(() => import("@/pages/onboarding/index"));

const OrganizationPage = lazy(() => import("@/pages/organization/index"));
const InvitesPage = lazy(() => import("@/pages/organization/invites"));
const MembersPage = lazy(() => import("@/pages/organization/members"));

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
          {
            path: ApplicationUrls.auth.organizationInvite,
            Component: OrganizationInvitePage,
          },
        ],
      },
      {
        path: ApplicationUrls.onboarding.index,
        Component: () => (
          <OnboardingLayout>
            <Outlet />
          </OnboardingLayout>
        ),
        children: [
          {
            path: ApplicationUrls.onboarding.index,
            Component: OnboardingPage,
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
      {
        path: ApplicationUrls.application.organization.index(),
        Component: () => (
          <OrganizationLayout>
            <Outlet />
          </OrganizationLayout>
        ),
        children: [
          {
            path: ApplicationUrls.application.organization.index(),
            Component: OrganizationPage,
          },
          {
            path: ApplicationUrls.application.organization.invites(),
            Component: InvitesPage,
          },
          {
            path: ApplicationUrls.application.organization.members(),
            Component: MembersPage,
          },
        ],
      },
    ],
  },
]);
