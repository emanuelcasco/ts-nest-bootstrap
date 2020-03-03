export function paginateParams(_page: number, _limit: number): { skip: number; take: number; page: number } {
  const page = Math.max(_page, 0);
  const take = Number(_limit);
  const skip = take * (Number(_page) - 1);
  return {
    skip,
    take,
    page
  };
}
