interface PaginationQuery {
  page?: number;
  limit?: number;
}

interface PaginationProperties {
  skip: number;
  take: number;
  page: number;
}

export function paginateParams(query: PaginationQuery | null): PaginationProperties {
  const { page: _page, limit: _limit } = Object.assign(query || {}, { page: 1, limit: 20 });
  const page = Math.max(_page, 1);
  const take = Math.max(_limit, 1);
  const skip = take * (Number(_page) - 1);
  return {
    skip,
    take,
    page
  };
}
