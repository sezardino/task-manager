export const ApplicationSearchParams = {
  inviteToken: "invite-token",
  loginEmail: "email",
};

export const ApplicationPageParams = {
  organizationId: "organizationId",
  projectId: "projectId",
};

export const ApplicationUrls = Object.freeze({
  auth: {
    index: "/auth",
    login: "/auth/login",
    registration: "/auth/registration",
    organizationInvite: "/auth/organization-invite",
  },
  landing: {
    index: "/",
  },
  application: {
    index: "/dashboard",
    organizations: "/organizations",
    organization: {
      index: (id = `:${ApplicationPageParams.organizationId}`) =>
        `${ApplicationUrls.application.organizations}/${id}`,
      members: (id?: string) =>
        `${ApplicationUrls.application.organization.index(id)}/members`,
      invites: (id?: string) =>
        `${ApplicationUrls.application.organization.index(id)}/invites`,
      projects: (id?: string) =>
        `${ApplicationUrls.application.organization.index(id)}/projects`,
      project: {
        index: (
          id = `:${ApplicationPageParams.projectId}`,
          organizationId?: string
        ) =>
          `${ApplicationUrls.application.organization.projects(organizationId)}/${id}`,
      },
    },
  },
  onboarding: {
    index: "/onboarding",
  },
});
