import { useAddMembersToProjectMutation } from "@/hooks/tanstack/mutations/project/add-members";
import { useOrganizationUsersQuery } from "@/hooks/tanstack/query/user/organization-users";
import { UserX } from "lucide-react";
import { PropsWithChildren, useCallback, useId, useState } from "react";
import {
  AddProjectMembersForm,
  AddProjectMembersFormValues,
} from "../forms/add-project-members";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Skeleton } from "../ui/skeleton";

export type AddMembersToProjectWrapperProps = PropsWithChildren & {
  organizationId: string;
  projectId: string;
};

export const AddMembersToProjectWrapper = (
  props: AddMembersToProjectWrapperProps
) => {
  const { projectId, organizationId, children } = props;
  const [isOpen, setIsOpen] = useState<boolean | undefined>();
  const formId = useId();

  const { data: organizationUsers, isLoading: isOrganizationUsersLoading } =
    useOrganizationUsersQuery({
      organizationId,
      notInProjectId: projectId,
      limit: 100,
    });

  const {
    mutateAsync: addMembers,
    error,
    isPending: isAddMembersPending,
  } = useAddMembersToProjectMutation();

  const addMembersHandler = useCallback(
    async (values: AddProjectMembersFormValues) => {
      try {
        await addMembers({ ...values, organizationId, projectId });

        setIsOpen(false);
      } catch (error) {
        console.log(error);
      }
    },
    [addMembers, organizationId, projectId]
  );

  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      {!isOrganizationUsersLoading && !!organizationUsers?.users.length && (
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create project</DialogTitle>
            <DialogDescription>
              Specify needed fields for your project
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {!isOrganizationUsersLoading && organizationUsers?.users && (
              <AddProjectMembersForm
                id={formId}
                onSubmit={addMembersHandler}
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
            <DialogClose asChild disabled={isAddMembersPending}>
              <Button size={"sm"} variant={"secondary"}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              form={formId}
              size={"sm"}
              disabled={isAddMembersPending}
              type="submit"
            >
              Create Project
            </Button>
          </DialogFooter>
        </DialogContent>
      )}

      {!isOrganizationUsersLoading && !organizationUsers?.users.length && (
        <DialogContent className="py-10">
          <DialogHeader className="flex flex-col gap-4">
            <div className="text-center">
              <DialogTitle asChild>
                <h2 className="text-2xl">There are no users to add</h2>
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                {" "}
                All organization users has been already added to this project
              </DialogDescription>
            </div>
            <UserX className="size-20 mx-auto text-muted-foreground -order-1" />
          </DialogHeader>
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
