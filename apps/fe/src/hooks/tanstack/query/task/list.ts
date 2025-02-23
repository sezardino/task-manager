import { ProjectApiService } from "@/api/project";
import { ProjectTasksInput } from "@/api/task/types";
import { useQuery } from "@tanstack/react-query";

export const PROJECT_TASKS_QUERY_KEY = "PROJECT_TASKS_QUERY_KEY";

export const getProjectTasksQuery = (input: ProjectTasksInput) => ({
  queryKey: [PROJECT_TASKS_QUERY_KEY, ...Object.values(input)],
  queryFn: () => ProjectApiService.list(input),
  retry: false,
});

export const useProjectTasksQuery = (input: ProjectTasksInput) =>
  useQuery(getProjectTasksQuery(input));
