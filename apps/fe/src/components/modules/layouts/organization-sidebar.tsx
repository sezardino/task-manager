import { UserRole } from "@/api/user/types";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useCurrentUserQuery } from "@/hooks/tanstack/query/user/current-user";
import { useForceLogout } from "@/hooks/use-force-logout";
import { ApplicationPageParams, ApplicationUrls } from "@/libs/router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";

import { LogOut, Rabbit, UserPlus, Users } from "lucide-react";
import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";

export const OrganizationSidebar = () => {
  const { data: user } = useCurrentUserQuery();
  // const location = useLocation();
  const params = useParams();
  const logout = useForceLogout();
  const organizationId = params[ApplicationPageParams.organizationId];

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
          <Rabbit className="size-9 inline" />
          <span className="ml-2 text-lg font-bold">Task manager</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {[UserRole.OWNER, UserRole.MODERATOR].includes(
          user?.role || UserRole.MEMBER
        ) && (
          <SidebarGroup>
            <SidebarGroupLabel>Owner</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {ownerLinks.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={location.pathname === item.href}
                    >
                      <Link to={item.href}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
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
