"use strict";
// import {
//   PaginationInput,
//   PaginationInput,
// } from "../interface/pagination.interface";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationObject = void 0;
const paginationObject = (q = {}) => {
    var _a;
    const page = Number(q.page) > 0 ? Number(q.page) : 1;
    const resultPerPage = Number(q.itemsPerPage) > 0 ? Number(q.itemsPerPage) : 10;
    const skip = (page - 1) * resultPerPage;
    const field = (((_a = q.sortField) === null || _a === void 0 ? void 0 : _a.trim()) || "createdAt");
    const order = q.sortOrder === "asc" ? 1 : -1;
    const sort = [[field, order]];
    return { page, skip, resultPerPage, sort };
};
exports.paginationObject = paginationObject;
