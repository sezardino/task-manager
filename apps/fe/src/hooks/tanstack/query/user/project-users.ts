import { UserApiService } from "@/api/user";
import { ProjectUsersInput } from "@/api/user/types";
import { useQuery } from "@tanstack/react-query";

export const PROJECT_USERS_QUERY_KEY = "PROJECT_USERS_QUERY_KEY";

export const getProjectUsersQuery = (input: ProjectUsersInput) => ({
  queryKey: [PROJECT_USERS_QUERY_KEY, ...Object.values(input)],
  queryFn: () => UserApiService.projectUsers(input),
  retry: false,
});

export const useProjectUsersQuery = (input: ProjectUsersInput) =>
  useQuery(getProjectUsersQuery(input));
