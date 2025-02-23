import { ProjectTasksPayload } from "@/api/task/types";
import { BoardColumn } from "@/components/modules/tasks/board-column";
import { TaskCard } from "@/components/modules/tasks/task-card";
import { Skeleton } from "@/components/ui/skeleton";
import { CreateTaskWrapper } from "@/components/wrappers/create-task";
import { useUpdateTaskMutation } from "@/hooks/tanstack/mutations/task/update";
import { useOrganizationProjectQuery } from "@/hooks/tanstack/query/project/one";
import { useProjectTasksQuery } from "@/hooks/tanstack/query/task/list";
import { ApplicationPageParams } from "@/libs/router-dom";
import { TaskStatus } from "@/types/enums";
import { useCallback, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

const ProjectPage = () => {
  const params = useParams();
  const organizationId = params[ApplicationPageParams.organizationId] as string;
  const projectId = params[ApplicationPageParams.projectId] as string;

  const [isCreateTaskModalOpened, setIsCreateTaskModalOpened] = useState(false);

  const { data: projectData, isLoading: isProjectDataLoading } =
    useOrganizationProjectQuery({ organizationId, projectId });

  const { data: tasksData, isLoading: isTasksLoading } = useProjectTasksQuery({
    organizationId,
    projectId,
  });

  const { mutate: updateTask } = useUpdateTaskMutation();

  const changeTaskStatusHandler = useCallback(
    (taskId: string, status: TaskStatus) => {
      console.log(123);
      updateTask({
        id: taskId,
        status,
        organizationId,
        projectId,
      });
    },
    [organizationId, projectId, updateTask]
  );

  const groupedTasks = useMemo(() => {
    const tasks: Record<TaskStatus, ProjectTasksPayload["data"]["tasks"]> = {
      NOT_STARTED: [],
      IN_PROGRESS: [],
      IN_REVIEW: [],
      COMPLETED: [],
    };

    if (!tasksData) return tasks;

    tasksData.forEach((t) => tasks[t.status].push(t));

    return tasks;
  }, [tasksData]);

  return (
    <>
      <main className="pt-10 min-h-dvh container overflow-visible flex flex-col">
        {!isProjectDataLoading && (
          <header>
            <h1 className="text-xl">{projectData?.name} board</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Here you can found all task related to selected project
            </p>
          </header>
        )}

        {isProjectDataLoading && <Skeleton className="h-14 w-full flex-col" />}

        <section className="mt-10 overflow-auto grow flex">
          <ul className="grid grid-cols-[repeat(4,320px)] gap-4 overflow-visible grow">
            {Object.entries(groupedTasks).map(([status, tasks]) => (
              <li key={status}>
                <BoardColumn
                  status={status as TaskStatus}
                  onAddTaskClick={() => setIsCreateTaskModalOpened(true)}
                >
                  <ul>
                    {isTasksLoading &&
                      new Array(10).fill(null).map((_, i) => (
                        <li key={i}>
                          <Skeleton className="w-full h-40" />
                        </li>
                      ))}

                    {tasks.map((t) => (
                      <li key={t.id}>
                        <TaskCard
                          status={status as TaskStatus}
                          title={t.title}
                          assignee={t.assignee}
                          href="#"
                          onChangeStatus={(status) =>
                            changeTaskStatusHandler(t.id, status)
                          }
                        />
                      </li>
                    ))}
                  </ul>
                </BoardColumn>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <CreateTaskWrapper
        isOpen={isCreateTaskModalOpened}
        onClose={() => setIsCreateTaskModalOpened(false)}
        organizationId={organizationId}
        projectId={projectId}
      />
    </>
  );
};

export default ProjectPage;
