import { useInviteUserMutation } from "@/hooks/tanstack/mutations/organization-invites/invite";
import { ApplicationSearchParams, ApplicationUrls } from "@/libs/router-dom";
import { useCallback, useId, useMemo, useState } from "react";
import {
  OrganizationInviteForm,
  OrganizationInviteFormValues,
} from "../forms/organization-invite";
import { Button } from "../ui/button";
import { CopyButton } from "../ui/copy-button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";

export type UserInviteWrapper = {
  isOpen: boolean;
  onClose: () => void;
  organizationId: string;
};

export const UserInviteWrapper = (props: UserInviteWrapper) => {
  const { organizationId, isOpen, onClose } = props;
  const inviteFormId = useId();

  const [inviteToken, setInviteTokenToken] = useState<string | null>(null);

  const { mutateAsync: invite, error } = useInviteUserMutation();

  const closeHandler = useCallback(() => {
    setInviteTokenToken(null);
    onClose();
  }, [onClose]);

  const inviteHandler = useCallback(
    async (values: OrganizationInviteFormValues) => {
      try {
        const response = await invite({ ...values, organizationId });

        setInviteTokenToken(response.token);
      } catch (error) {
        console.log(error);
      }
    },
    [invite, organizationId]
  );

  const inviteLink = useMemo(() => {
    if (!inviteToken) return window.location.origin;

    const url = new URL(ApplicationUrls.auth.organizationInvite, window.origin);

    url.searchParams.set(ApplicationSearchParams.inviteToken, inviteToken);

    return url.toString();
  }, [inviteToken]);

  return (
    <>
      <Dialog open={isOpen && !inviteToken} onOpenChange={closeHandler}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Invite user</DialogTitle>
            <DialogDescription>
              Specify name for user identification in table and select role what
              should be
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <OrganizationInviteForm
              id={inviteFormId}
              onSubmit={inviteHandler}
              error={error?.message || undefined}
            />
          </div>
          <DialogFooter>
            <Button size={"sm"} variant={"secondary"} onClick={closeHandler}>
              Cancel
            </Button>
            <Button form={inviteFormId} size={"sm"} type="submit">
              Create invite
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isOpen && !!inviteToken} onOpenChange={closeHandler}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Invite successfully created</DialogTitle>
            <DialogDescription>
              Send the received invite link to the user so they can join your
              organization.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-3">
            <Input value={inviteLink} readOnly />
            <CopyButton
              value={inviteLink}
              variant={"default"}
              className="rounded-sm"
            />
          </div>
          <DialogFooter>
            <Button className="justify-self-center" onClick={closeHandler}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
