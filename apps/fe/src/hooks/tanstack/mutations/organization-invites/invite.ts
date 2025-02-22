import { OrganizationInvitesApiService } from "@/api/organization-invites";
import { InviteUserInput } from "@/api/organization-invites/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ORGANIZATION_INVITES_QUERY_KEY } from "../../query/organization-invites/organization-invites";

export const useInviteUserMutation = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (input: InviteUserInput) =>
      OrganizationInvitesApiService.invite(input),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [ORGANIZATION_INVITES_QUERY_KEY] });
      toast.success("Invite link created");
    },
  });
};
