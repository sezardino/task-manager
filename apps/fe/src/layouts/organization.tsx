import { OrganizationSidebar } from "@/components/modules/layouts/organization-sidebar";
import { PropsWithChildren } from "react";
import { WithSidebarLayout } from "./with-sidebar";

export const OrganizationLayout = ({ children }: PropsWithChildren) => {
  return (
    <WithSidebarLayout>
      <OrganizationSidebar />
      <div className="w-full">{children}</div>
    </WithSidebarLayout>
  );
};
