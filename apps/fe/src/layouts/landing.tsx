import { LandingNavbar } from "@/components/modules/layouts/landing-navbar";
import { useCurrentUserQuery } from "@/hooks/tanstack/query/user/current-user";
import { useForceLogout } from "@/hooks/use-force-logout";
import { PropsWithChildren } from "react";

export const LandingLayout = ({ children }: PropsWithChildren) => {
  const { data: currentUser } = useCurrentUserQuery();
  const logout = useForceLogout();

  return (
    <>
      <LandingNavbar
        isUserAuthenticated={!!currentUser}
        onLogoutClick={logout}
      />

      {children}
    </>
  );
};
