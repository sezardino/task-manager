import { ProjectApiService } from "@/api/project";
import { AddMembersToProjectInput } from "@/api/project/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useAddMembersToProjectMutation = () =>
  useMutation({
    mutationFn: (input: AddMembersToProjectInput) =>
      ProjectApiService.addMembers(input),
    onSuccess: (payload) =>
      toast.success(
        `Successfully added ${payload.usersCount} users to project.`
      ),
  });
