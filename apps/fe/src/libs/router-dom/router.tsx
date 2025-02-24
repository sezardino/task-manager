import { Spinner } from "@/components/ui/spinner";
import { currentUserQuery } from "@/hooks/tanstack/query/user/current-user";
import { ApplicationLayout } from "@/layouts/application";
import { AuthLayout } from "@/layouts/auth";
import { LandingLayout } from "@/layouts/landing";
import { OnboardingLayout } from "@/layouts/onboarding";
import { OrganizationLayout } from "@/layouts/organization";
import { ProjectLayout } from "@/layouts/project";
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

const DashboardPage = lazy(() => import("@/pages/application/dashboard"));
const OrganizationsPage = lazy(
  () => import("@/pages/application/organizations")
);

const OrganizationPage = lazy(
  () => import("@/pages/organizations/organization")
);
const InvitesPage = lazy(() => import("@/pages/organizations/invites"));
const MembersPage = lazy(() => import("@/pages/organizations/members"));

const ProjectsPage = lazy(() => import("@/pages/projects/projects"));
const ProjectPage = lazy(() => import("@/pages/projects/project"));
const ProjectMembersPage = lazy(() => import("@/pages/projects/members"));

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
        Component: () => (
          <LandingLayout>
            <Outlet />
          </LandingLayout>
        ),
        children: [
          {
            path: ApplicationUrls.landing.index,
            Component: LandingPage,
          },
        ],
      },
      {
        path: ApplicationUrls.application.index,
        Component: () => (
          <ApplicationLayout>
            <DashboardPage />
          </ApplicationLayout>
        ),
      },
      {
        path: ApplicationUrls.application.organizations,
        Component: () => (
          <ApplicationLayout>
            <OrganizationsPage />
          </ApplicationLayout>
        ),
      },
      {
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
          {
            path: ApplicationUrls.application.organization.projects(),
            Component: ProjectsPage,
          },
        ],
      },
      {
        Component: () => (
          <ProjectLayout>
            <Outlet />
          </ProjectLayout>
        ),
        children: [
          {
            path: ApplicationUrls.application.organization.project.index(),
            Component: ProjectPage,
          },
          {
            path: ApplicationUrls.application.organization.project.users(),
            Component: ProjectMembersPage,
          },
        ],
      },
    ],
  },
]);
