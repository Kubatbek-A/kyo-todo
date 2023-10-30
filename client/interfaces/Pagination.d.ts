interface IPagination {
  page: number;
  limit: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

type IPaginationRequest = Partial<Pick<IPagination, "page" | "limit">>;
