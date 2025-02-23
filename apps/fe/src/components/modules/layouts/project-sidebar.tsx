import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { TruncatedTypography } from "@/components/ui/typography";
import { useOrganizationProjectQuery } from "@/hooks/tanstack/query/project/one";
import { useForceLogout } from "@/hooks/use-force-logout";
import { ApplicationPageParams, ApplicationUrls } from "@/libs/router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";

import { Skeleton } from "@/components/ui/skeleton";
import { LogOut, Rabbit, SquareChartGantt } from "lucide-react";
import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { SidebarMenuWidget } from "./sidebar-menu-widget";

export const ProjectSidebar = () => {
  const params = useParams();
  const organizationId = params[ApplicationPageParams.organizationId] as string;
  const projectId = params[ApplicationPageParams.projectId] as string;

  const { data: projectData, isLoading: isProjectDataLoading } =
    useOrganizationProjectQuery({
      projectId,
      organizationId,
    });

  const logout = useForceLogout();

  const restLinks = useMemo(
    () => [
      {
        title: "Board",
        icon: SquareChartGantt,
        href: ApplicationUrls.application.organization.projects(organizationId),
      },
    ],
    [organizationId]
  );

  return (
    <Sidebar>
      <SidebarHeader>
        {!isProjectDataLoading && (
          <Link
            to={ApplicationUrls.application.organization.project.index(
              projectId,
              organizationId
            )}
          >
            <Rabbit className="size-9 inline" />
            <TruncatedTypography
              level="span"
              text={projectData?.name}
              className="ml-2 text-lg font-bold inline"
            />
          </Link>
        )}
        {isProjectDataLoading && (
          <Skeleton className="w-full h-10 inline ml-2" />
        )}
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenuWidget links={restLinks} />

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
