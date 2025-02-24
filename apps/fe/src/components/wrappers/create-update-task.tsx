import { useCreateTaskMutation } from "@/hooks/tanstack/mutations/task/create";
import { useProjectTaskQuery } from "@/hooks/tanstack/query/task/one";
import { useProjectUsersQuery } from "@/hooks/tanstack/query/user/project-users";
import { ApplicationUrls } from "@/libs/router-dom";
import { PropsWithChildren, useCallback, useId } from "react";
import { useNavigate } from "react-router-dom";
import { TaskForm, TaskFormValues } from "../forms/task";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Skeleton } from "../ui/skeleton";

export type CreateUpdateTaskWrapperProps = PropsWithChildren & {
  organizationId: string;
  projectId: string;
  taskId?: string;
  isOpen: boolean;
  onClose: () => void;
};

export const CreateUpdateTaskWrapper = (
  props: CreateUpdateTaskWrapperProps
) => {
  const { isOpen, taskId, onClose, projectId, organizationId } = props;
  const navigate = useNavigate();

  const formId = useId();

  const { data: taskData, isLoading: isTaskDataLoading } = useProjectTaskQuery({
    id: taskId!,
    organizationId,
    projectId,
  });

  const { data: organizationUsers, isLoading: isOrganizationUsersLoading } =
    useProjectUsersQuery({
      organizationId,
      projectId,
      limit: 100,
    });

  const {
    mutateAsync: createTask,
    error: createError,
    isPending: isCreateTaskPending,
  } = useCreateTaskMutation();

  const {
    mutateAsync: updateTask,
    error: updateError,
    isPending: isUpdateTaskPending,
  } = useCreateTaskMutation();

  const taskHandler = useCallback(
    async (values: TaskFormValues) => {
      const isEdit = !!taskId && !!taskData;

      let responseId;
      try {
        if (!isEdit) {
          const response = await createTask({
            ...values,
            organizationId,
            projectId,
          });

          responseId = response.id;
        } else {
          const response = await updateTask({
            ...values,
            organizationId,
            projectId,
          });

          responseId = response.id;
        }

        navigate(
          ApplicationUrls.application.organization.project.taskDetails(
            responseId,
            projectId,
            organizationId
          )
        );

        onClose();
      } catch (error) {
        console.log(error);
      }
    },
    [
      createTask,
      navigate,
      onClose,
      organizationId,
      projectId,
      taskData,
      taskId,
      updateTask,
    ]
  );

  const error = createError || updateError;
  const isLoading = isCreateTaskPending || isUpdateTaskPending;

  const title =
    taskId && taskData ? `Update task ${taskData.title}` : "Create task";

  const isNeededDataLoading =
    isOrganizationUsersLoading || (taskId && isTaskDataLoading);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {!isNeededDataLoading && (
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>
              Specify needed fields for this task
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {!isNeededDataLoading && organizationUsers?.users && (
              <TaskForm
                id={formId}
                onSubmit={taskHandler}
                users={
                  organizationUsers.users.map((u) => ({
                    ...u,
                    id: u.userId,
                  })) || []
                }
                initialValues={{
                  assigneeId: taskData?.assignee.id,
                  description: taskData?.description || "",
                  title: taskData?.title || "",
                }}
                error={error?.message || undefined}
              />
            )}
            {isNeededDataLoading && <Skeleton className="w-full h-[500px]" />}
          </div>
          <DialogFooter>
            <DialogClose asChild disabled={isLoading}>
              <Button size={"sm"} variant={"secondary"}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              form={formId}
              size={"sm"}
              disabled={isLoading}
              type="submit"
            >
              {taskId && taskData ? "Update" : "Create"} task
            </Button>
          </DialogFooter>
        </DialogContent>
      )}

      {isNeededDataLoading && (
        <DialogContent>
          <Skeleton className="w-full h-80" />
        </DialogContent>
      )}
    </Dialog>
  );
};
