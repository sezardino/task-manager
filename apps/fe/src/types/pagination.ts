export type PaginationInput = {
  page?: number;
  limit?: number;
};

export type PaginationPayload = {
  meta: {
    totalCount: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};
