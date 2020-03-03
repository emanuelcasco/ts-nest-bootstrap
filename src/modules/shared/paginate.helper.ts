export function paginateParams(
  _page: number = 1,
  _limit: number = 20
): { skip: number; take: number; page: number } {
  const page = Math.max(_page, 1);
  const take = Number(_limit);
  const skip = take * (Number(_page) - 1);
  return {
    skip,
    take,
    page
  };
}
