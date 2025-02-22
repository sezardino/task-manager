import { ApplicationNavbar } from "@/components/modules/layouts/application-navbar";
import { useCurrentUserQuery } from "@/hooks/tanstack/query/user/current-user";
import { useForceLogout } from "@/hooks/use-force-logout";
import { PropsWithChildren } from "react";

export const ApplicationLayout = ({ children }: PropsWithChildren) => {
  const { data: currentUser } = useCurrentUserQuery();
  const logout = useForceLogout();

  return (
    <>
      <ApplicationNavbar
        isUserAuthenticated={!!currentUser}
        onLogoutClick={logout}
      />
      {children}
    </>
  );
};
