import { type QueryFunction, type QueryKey } from "@tanstack/react-query";
import { queryClient } from "./client";

type Query<T = unknown> = { queryKey: QueryKey; queryFn: QueryFunction<T> };
type QueryResult<T extends Query> = Awaited<ReturnType<T["queryFn"]>>;

const getQueryCache = <T>(query: Query<T>) => {
  const cache = queryClient.getQueryData(query.queryKey);
  return cache as QueryResult<typeof query>;
};

export const getFromCacheOrFetch = async <T>(query: Query<T>) =>
  getQueryCache(query) ?? (await queryClient.fetchQuery(query));
