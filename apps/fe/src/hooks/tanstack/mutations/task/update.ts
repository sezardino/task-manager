import { TaskApiService } from "@/api/task";
import { UpdateTaskInput } from "@/api/task/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { PROJECT_TASKS_QUERY_KEY } from "../../query/task/list";

export const useUpdateTaskMutation = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (input: UpdateTaskInput) => TaskApiService.update(input),
    onSuccess: (payload) => {
      toast.success(`Task ${payload.title} successfully updated.`);

      client.invalidateQueries({ queryKey: [PROJECT_TASKS_QUERY_KEY] });
    },
  });
};
