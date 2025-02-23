import { useCreateOrganizationMutation } from "@/hooks/tanstack/mutations/organization/create-organization";
import { ApplicationUrls } from "@/libs/router-dom";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { PropsWithChildren, useCallback, useId } from "react";
import { useNavigate } from "react-router-dom";
import {
  OrganizationForm,
  OrganizationFormValues,
} from "../forms/organization";
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

export type CreateOrganizationWrapperProps = PropsWithChildren;

export const CreateOrganizationWrapper = (
  props: CreateOrganizationWrapperProps
) => {
  const { children } = props;
  const navigate = useNavigate();
  const formId = useId();

  const {
    mutateAsync: create,
    error,
    isPending: isCreatePending,
  } = useCreateOrganizationMutation();

  const createHandler = useCallback(
    async (values: OrganizationFormValues) => {
      try {
        const response = await create({ ...values });

        navigate(ApplicationUrls.application.organization.index(response.id));
      } catch (error) {
        console.log(error);
      }
    },
    [create, navigate]
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
          <OrganizationForm
            id={formId}
            onSubmit={createHandler}
            error={error?.message || undefined}
          />
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
            Create Organization
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
