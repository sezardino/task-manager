import { TaskApiService } from "@/api/task";
import { UpdateTaskInput } from "@/api/task/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateTaskMutation = () =>
  useMutation({
    mutationFn: (input: UpdateTaskInput) => TaskApiService.update(input),
    onSuccess: (payload) =>
      toast.success(`Task ${payload.title} successfully updated.`),
  });
