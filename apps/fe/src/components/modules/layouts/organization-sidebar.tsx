import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { useCurrentUserQuery } from "@/hooks/tanstack/query/user/current-user";
import { useForceLogout } from "@/hooks/use-force-logout";
import { ApplicationPageParams, ApplicationUrls } from "@/libs/router-dom";
import { UserRole } from "@/types/enums";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";

import {
  Home,
  LogOut,
  Rabbit,
  SquareChartGantt,
  UserPlus,
  Users,
} from "lucide-react";
import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { SidebarMenuWidget } from "./sidebar-menu-widget";

export const OrganizationSidebar = () => {
  const { data: user } = useCurrentUserQuery();

  const params = useParams();
  const logout = useForceLogout();
  const organizationId = params[ApplicationPageParams.organizationId];

  const mainLinks = useMemo(
    () => [
      {
        title: "Home",
        icon: Home,
        href: ApplicationUrls.application.organization.index(organizationId),
      },
      {
        title: "Projects",
        icon: SquareChartGantt,
        href: ApplicationUrls.application.organization.projects(organizationId),
      },
    ],
    [organizationId]
  );

  const ownerLinks = useMemo(
    () => [
      {
        title: "Users",
        icon: Users,
        href: ApplicationUrls.application.organization.members(organizationId),
      },
      {
        title: "Invites",
        icon: UserPlus,
        href: ApplicationUrls.application.organization.invites(organizationId),
      },
    ],
    [organizationId]
  );

  return (
    <Sidebar>
      <SidebarHeader>
        <Link to={ApplicationUrls.application.index}>
          <Rabbit className="size-9 inline text-muted-foreground" />
          <span className="ml-2 text-lg font-bold">Task manager</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenuWidget label="Main" links={mainLinks} />

        {[UserRole.OWNER, UserRole.ADMIN].includes(
          user?.role || UserRole.MEMBER
        ) && <SidebarMenuWidget label="Manage" links={ownerLinks} />}

        <SidebarFooter className="mt-auto">
          <ul className="flex items-center justify-center gap-2">
            <li>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="icon" variant="ghost" onClick={logout}>
                    <LogOut />
                  </Button>
                </TooltipTrigger>

                <TooltipContent className="select-none">Logout</TooltipContent>
              </Tooltip>
            </li>
          </ul>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
};
