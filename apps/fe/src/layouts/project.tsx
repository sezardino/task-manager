import { ProjectSidebar } from "@/components/modules/layouts/project-sidebar";
import { PropsWithChildren } from "react";
import { WithSidebarLayout } from "./with-sidebar";

export const ProjectLayout = ({ children }: PropsWithChildren) => {
  return (
    <WithSidebarLayout>
      <ProjectSidebar />
      <div className="w-full">{children}</div>
    </WithSidebarLayout>
  );
};
