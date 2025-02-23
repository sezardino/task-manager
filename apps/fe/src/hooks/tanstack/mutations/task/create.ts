import { TaskApiService } from "@/api/task";
import { CreateTaskInput } from "@/api/task/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { PROJECT_TASKS_QUERY_KEY } from "../../query/task/list";

export const useCreateTaskMutation = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateTaskInput) => TaskApiService.create(input),
    onSuccess: (payload) => {
      toast.success(`Task ${payload.title} successfully created.`);
      client.invalidateQueries({ queryKey: [PROJECT_TASKS_QUERY_KEY] });
    },
  });
};
