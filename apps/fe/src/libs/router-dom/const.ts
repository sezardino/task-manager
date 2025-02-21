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
      index: (id = ":organizationId") => `/${id}`,
    },
  },
  onboarding: {
    index: "/onboarding",
  },
});
