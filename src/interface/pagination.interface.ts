export type SortOrderType = 1 | -1;

export interface PaginationInput {
  page?: number;
  itemsPerPage?: number;
  sortField?: string;
  sortOrder?: "asc" | "desc";
}

export interface PaginationOutput {
  page: number;
  skip: number;
  resultPerPage: number;
  sort: [string, SortOrderType][];
}
