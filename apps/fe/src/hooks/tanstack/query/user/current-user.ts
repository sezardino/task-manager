import { UserApiService } from "@/api/user";
import { useQuery } from "@tanstack/react-query";

export const CURRENT_USER_QUERY_KEY = "CURRENT_USER_QUERY_KEY";

export const currentUserQuery = {
  queryKey: [CURRENT_USER_QUERY_KEY],
  queryFn: () => UserApiService.currentUser(),
  retry: false,
};

export const useCurrentUserQuery = () => useQuery(currentUserQuery);
