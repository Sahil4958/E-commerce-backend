// export interface PaginationInput {
//   page?: number;
//   itemsPerPage?: number;
//   sortOrder?: "asc" | "desc";
//   sortField?: string;
// }

// export interface PaginationOutput {
//   page: number;
//   skip: number;
//   resultPerPage: number;
//   sort: Record<string, number>;
// }

// export interface PaginationInput {
//   page?: number;
//   itemsPerPage?: number;
//   sortField?: string;
//   sortOrder?: "asc" | "desc";
// }
// export type SortOrderType = 1 | -1 | "asc" | "desc";
// export interface PaginationOutput {
//   page: number;
//   skip: number;
//   resultPerPage: number;
//   sort: [string, SortOrderType][];
// }
// export interface PaginationInput {
//   itemsPerPage(itemsPerPage: any): unknown;
//   sortOrder: string;
//   sortField: any;
//   page?: number;
//   limit?: number;
//   sort?: string;
// }

// interface PaginationOutput {
//   skip: number;
//   resultPerPage: number;
//   sort: Record<string, 1 | -1>;
// }

// export const paginationObject = (
//   pagination?: PaginationInput
// ): PaginationOutput => {
//   const page = pagination?.page ?? 1;
//   const limit = pagination?.limit ?? 10;
//   const sortField = pagination?.sort ?? "-createdAt";

//   const sort: Record<string, 1 | -1> = {};
//   if (sortField.startsWith("-")) {
//     sort[sortField.substring(1)] = -1;
//   } else {
//     sort[sortField] = 1;
//   }

//   return {
//     skip: (page - 1) * limit,
//     resultPerPage: limit,
//     sort,
//   };
// };

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
