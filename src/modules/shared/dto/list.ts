export class ListDto<T> {
  records: T[];

  count: number;

  page: number;

  limit: number;
}
