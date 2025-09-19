// import {
//   PaginationInput,
//   PaginationInput,
// } from "../interface/pagination.interface";

// export const paginationObject = (
//   paginationObject: PaginationInput
// ): PaginationOutput => {
//   const page = Number(paginationObject.page) || 1;
//   const resultPerPage = Number(paginationObject.itemsPerPage) || 10;
//   const skip = resultPerPage * (page - 1);
//   const sortOrder = paginationObject.sortOrder === "asc" ? 1 : -1;
//   const sortField = paginationObject.sortField?.trim()
//     ? paginationObject.sortField
//     : "createdAt";

//   const sort: Record<string, number> = { [sortField]: sortOrder };

//   return { page, skip, resultPerPage, sort };
// };

// import { PaginationInput, PaginationOutput, SortOrderType } from "../interface/pagination.interface";

// export const paginationObject = (pagination: PaginationInput = {}): PaginationOutput => {
//   const page = Number(pagination.page) || 1;
//   const resultPerPage = Number(pagination.itemsPerPage) || 10;
//   const skip = (page - 1) * resultPerPage;

//   const sortField = pagination.sortField?.trim() || "createdAt";
//   const sortOrder: SortOrderType = pagination.sortOrder === "asc" ? 1 : -1;

//   const sort: Record<string, SortOrderType> = { [sortField]: sortOrder };

//   return { page, skip, resultPerPage, sort };
// };
import { PaginationInput, PaginationOutput, SortOrderType } from "../interface/pagination.interface";

export const paginationObject = (q: PaginationInput = {}): PaginationOutput => {
  const page = Number(q.page) > 0 ? Number(q.page) : 1;
  const resultPerPage = Number(q.itemsPerPage) > 0 ? Number(q.itemsPerPage) : 10;
  const skip = (page - 1) * resultPerPage;

  const field = (q.sortField?.trim() || "createdAt") as string;
  const order: SortOrderType = q.sortOrder === "asc" ? 1 : -1;

  const sort: [string, SortOrderType][] = [[field, order]];

  return { page, skip, resultPerPage, sort };
};
