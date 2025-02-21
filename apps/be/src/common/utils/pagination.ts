import { DEFAULT_PAGINATION_PAGE_NUMBER } from '../input/pagination.input';
import { PaginationMeta } from '../payload/pagination.payload';

type Response = {
  meta: PaginationMeta;
  skip: number;
};

export const getPaginationData = (
  total: number,
  page: number,
  limit: number,
): Response => {
  if (total === 0) {
    return {
      skip: 0,
      meta: {
        limit,
        page: DEFAULT_PAGINATION_PAGE_NUMBER,
        totalCount: 0,
        totalPages: 0,
      },
    };
  }

  const totalPages = Math.ceil(total / limit);
  const currentPage = Math.min(page, totalPages);

  const skip = (currentPage - 1) * limit;

  return {
    skip,
    meta: {
      limit,
      page: currentPage,
      totalCount: total,
      totalPages,
    },
  };
};
