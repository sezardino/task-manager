import { useCreateTaskMutation } from "@/hooks/tanstack/mutations/task/create";
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

export type CreateTaskWrapperProps = PropsWithChildren & {
  organizationId: string;
  projectId: string;
  isOpen: boolean;
  onClose: () => void;
};

export const CreateTaskWrapper = (props: CreateTaskWrapperProps) => {
  const navigate = useNavigate();
  const { isOpen, onClose, projectId, organizationId } = props;

  const formId = useId();

  const { data: organizationUsers, isLoading: isOrganizationUsersLoading } =
    useProjectUsersQuery({
      organizationId,
      projectId,
      limit: 100,
    });

  const {
    mutateAsync: createTask,
    error,
    isPending: isCreateTaskPending,
  } = useCreateTaskMutation();

  const createTaskHandler = useCallback(
    async (values: TaskFormValues) => {
      try {
        const response = await createTask({
          ...values,
          organizationId,
          projectId,
        });

        navigate(
          ApplicationUrls.application.organization.project.taskDetails(
            response.id,
            projectId,
            organizationId
          )
        );

        onClose();
      } catch (error) {
        console.log(error);
      }
    },
    [createTask, navigate, onClose, organizationId, projectId]
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {!isOrganizationUsersLoading && (
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create task</DialogTitle>
            <DialogDescription>
              Specify needed fields for this task
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {!isOrganizationUsersLoading && organizationUsers?.users && (
              <TaskForm
                id={formId}
                onSubmit={createTaskHandler}
                users={
                  organizationUsers.users.map((u) => ({
                    ...u,
                    id: u.userId,
                  })) || []
                }
                error={error?.message || undefined}
              />
            )}
            {isOrganizationUsersLoading && (
              <Skeleton className="w-full h-[500px]" />
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild disabled={isCreateTaskPending}>
              <Button size={"sm"} variant={"secondary"}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              form={formId}
              size={"sm"}
              disabled={isCreateTaskPending}
              type="submit"
            >
              Create task
            </Button>
          </DialogFooter>
        </DialogContent>
      )}

      {isOrganizationUsersLoading && (
        <DialogContent>
          <Skeleton className="w-full h-80" />
        </DialogContent>
      )}
    </Dialog>
  );
};
