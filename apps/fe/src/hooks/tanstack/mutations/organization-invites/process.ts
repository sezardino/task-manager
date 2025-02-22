import { OrganizationInvitesApiService } from "@/api/organization-invites";
import { ProcessOrganizationInviteInput } from "@/api/organization-invites/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const declineText = "Invite successfully declined";
const acceptText = "Invite successfully accepted";

export const useProcessOrganizationInviteMutation = () => {
  return useMutation({
    mutationFn: (input: ProcessOrganizationInviteInput) =>
      OrganizationInvitesApiService.process(input),
    onSuccess: (_, input) =>
      toast.success(input.accept ? acceptText : declineText),
  });
};
