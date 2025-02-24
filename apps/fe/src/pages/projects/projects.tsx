import { CardsList } from "@/components/modules/common/cards-list";
import { ProjectCard } from "@/components/modules/project/project-card";
import { Button } from "@/components/ui/button";
import { CreateProjectWrapper } from "@/components/wrappers/create-project";
import { useOrganizationProjectsQuery } from "@/hooks/tanstack/query/project/list";
import { ApplicationPageParams } from "@/libs/router-dom";
import { useParams } from "react-router-dom";

const ProjectsPage = () => {
  const params = useParams();
  const organizationId = params[ApplicationPageParams.organizationId] as string;

  const { data: projectsData, isLoading: isProjectDataLoading } =
    useOrganizationProjectsQuery({ organizationId });

  return (
    <main className="container py-10">
      <header className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="mt-2">
            Here you can found all projects that are available for you
          </p>
        </div>
        <CreateProjectWrapper organizationId={organizationId}>
          <Button size={"sm"} className="mt-5">
            Create new project
          </Button>
        </CreateProjectWrapper>
      </header>

      <section className="mt-10">
        <CardsList
          isLoading={isProjectDataLoading}
          emptyState={
            <div className="text-center">
              <h2 className="text-xl text-bold">No projects found</h2>
              <CreateProjectWrapper organizationId={organizationId}>
                <Button size={"sm"} className="mt-5">
                  Create new project
                </Button>
              </CreateProjectWrapper>
            </div>
          }
          items={projectsData?.projects || []}
          render={(project) => (
            <ProjectCard
              organizationId={organizationId}
              project={project}
              className="h-full"
            />
          )}
        />
      </section>
    </main>
  );
};

export default ProjectsPage;
