import { TaskApiService } from "@/api/task";
import { ProjectTasksInput } from "@/api/task/types";
import { useQuery } from "@tanstack/react-query";

export const PROJECT_TASKS_QUERY_KEY = "PROJECT_TASKS_QUERY_KEY";

export const getProjectTasksQuery = (input: ProjectTasksInput) => ({
  queryKey: [PROJECT_TASKS_QUERY_KEY, ...Object.values(input)],
  queryFn: () => TaskApiService.list(input),
  retry: false,
});

export const useProjectTasksQuery = (input: ProjectTasksInput) =>
  useQuery(getProjectTasksQuery(input));
