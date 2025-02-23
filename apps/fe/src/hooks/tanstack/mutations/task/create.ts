import { TaskApiService } from "@/api/task";
import { CreateTaskInput } from "@/api/task/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateTaskMutation = () =>
  useMutation({
    mutationFn: (input: CreateTaskInput) => TaskApiService.create(input),
    onSuccess: (payload) =>
      toast.success(`Task ${payload.title} successfully created.`),
  });
