import { ProjectApiService } from "@/api/project";
import { CreateProjectInput } from "@/api/project/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateProjectMutation = () =>
  useMutation({
    mutationFn: (input: CreateProjectInput) => ProjectApiService.create(input),
    onSuccess: (payload) =>
      toast.success(`Project ${payload.name} successfully created.`),
  });
