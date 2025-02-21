export const ApplicationPageParams = {
  organizationId: "organizationId",
};

export const ApplicationUrls = Object.freeze({
  auth: {
    index: "/auth",
    login: "/auth/login",
    registration: "/auth/registration",
  },
  landing: {
    index: "/",
  },
  application: {
    index: "/app",
    organization: {
      index: (id = `:${ApplicationPageParams.organizationId}`) => `/${id}`,
      members: (id = `:${ApplicationPageParams.organizationId}`) =>
        `/${id}/members`,
      invites: (id = `:${ApplicationPageParams.organizationId}`) =>
        `/${id}/invites`,
    },
  },
  onboarding: {
    index: "/onboarding",
  },
});
