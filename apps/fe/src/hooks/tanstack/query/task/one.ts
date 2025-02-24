import { TaskApiService } from "@/api/task";
import { ProjectTaskInput } from "@/api/task/types";
import { useQuery } from "@tanstack/react-query";

export const PROJECT_TASK_QUERY = "PROJECT_TASK_QUERY";

export const getProjectTaskQuery = (input: ProjectTaskInput) => ({
  queryKey: [PROJECT_TASK_QUERY, ...Object.values(input)],
  queryFn: () => TaskApiService.one(input),
  retry: false,
  enabled: !!input.id,
});

export const useProjectTaskQuery = (input: ProjectTaskInput) =>
  useQuery(getProjectTaskQuery(input));
