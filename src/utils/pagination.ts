import {
  PaginationInput,
  PaginationOutput,
  SortOrderType,
} from "../interface/pagination.interface";

export const paginationObject = (q: PaginationInput = {}): PaginationOutput => {
  const page = Number(q.page) > 0 ? Number(q.page) : 1;
  const resultPerPage =
    Number(q.itemsPerPage) > 0 ? Number(q.itemsPerPage) : 10;
  const skip = (page - 1) * resultPerPage;

  const field = (q.sortField?.trim() || "createdAt") as string;
  const order: SortOrderType = q.sortOrder === "asc" ? 1 : -1;

  const sort: [string, SortOrderType][] = [[field, order]];

  return { page, skip, resultPerPage, sort };
};
