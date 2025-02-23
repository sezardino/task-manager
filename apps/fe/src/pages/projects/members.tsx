import { ProjectMembersTable } from "@/components/modules/project/project-members-table";
import { Button } from "@/components/ui/button";
import { PaginationWidget } from "@/components/ui/pagination-widget";
import { AddMembersToProjectWrapper } from "@/components/wrappers/add-members-to-project";
import { useProjectUsersQuery } from "@/hooks/tanstack/query/user/project-users";
import { ApplicationPageParams } from "@/libs/router-dom";
import { useParams } from "react-router-dom";

const ProjectMembersPage = () => {
  const params = useParams();
  const organizationId = params[ApplicationPageParams.organizationId] as string;
  const projectId = params[ApplicationPageParams.projectId] as string;

  const { data: usersData, isLoading: isUsersLoading } = useProjectUsersQuery({
    organizationId,
    projectId,
  });

  return (
    <main className="container py-10">
      <header className="flex items-center justify-between flex-wrap">
        <div>
          <h1 className="font-bold text-2xl">Project members</h1>
          <p>Here you can find all members of the selected project</p>
        </div>
        <AddMembersToProjectWrapper
          organizationId={organizationId}
          projectId={projectId}
        >
          <Button size={"sm"}>Add users from organization</Button>
        </AddMembersToProjectWrapper>
      </header>

      <section className="mt-10">
        <ProjectMembersTable
          isLoading={isUsersLoading}
          data={usersData?.users || []}
        />
        {!isUsersLoading && (
          <PaginationWidget
            onPageChange={() => {}}
            page={usersData?.meta.page || 1}
            totalPages={usersData?.meta.totalPages || 1}
            className="mt-10"
          />
        )}
      </section>
    </main>
  );
};

export default ProjectMembersPage;
