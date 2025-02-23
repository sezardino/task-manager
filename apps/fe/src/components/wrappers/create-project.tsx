import { useCreateProjectMutation } from "@/hooks/tanstack/mutations/project/create";
import { useOrganizationUsersQuery } from "@/hooks/tanstack/query/user/organization-users";
import { ApplicationUrls } from "@/libs/router-dom";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { PropsWithChildren, useCallback, useId } from "react";
import { useNavigate } from "react-router-dom";
import { ProjectForm, ProjectFormValues } from "../forms/project";
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

export type CreateProjectWrapperProps = PropsWithChildren & {
  organizationId: string;
};

export const CreateProjectWrapper = (props: CreateProjectWrapperProps) => {
  const { organizationId, children } = props;
  const navigate = useNavigate();
  const formId = useId();

  const { data: organizationUsers, isLoading: isOrganizationUsersLoading } =
    useOrganizationUsersQuery({
      organizationId,
      limit: 100,
    });

  const {
    mutateAsync: create,
    error,
    isPending: isCreatePending,
  } = useCreateProjectMutation();

  const inviteHandler = useCallback(
    async (values: ProjectFormValues) => {
      try {
        const response = await create({ ...values, organizationId });

        navigate(
          ApplicationUrls.application.organization.project.index(
            response.id,
            organizationId
          )
        );
      } catch (error) {
        console.log(error);
      }
    },
    [create, navigate, organizationId]
  );

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create project</DialogTitle>
          <DialogDescription>
            Specify needed fields for your project
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {!isOrganizationUsersLoading && organizationUsers?.users && (
            <ProjectForm
              id={formId}
              onSubmit={inviteHandler}
              users={
                organizationUsers.users.map((u) => ({ ...u, id: u.userId })) ||
                []
              }
              error={error?.message || undefined}
            />
          )}
          {isOrganizationUsersLoading && (
            <Skeleton className="w-full h-[500px]" />
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild disabled={isCreatePending}>
            <Button size={"sm"} variant={"secondary"}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            form={formId}
            size={"sm"}
            disabled={isCreatePending}
            type="submit"
          >
            Create Project
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
