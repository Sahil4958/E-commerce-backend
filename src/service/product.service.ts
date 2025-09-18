import { Types } from "mongoose";
import { Product, IProductModel } from "../models/product.model";
import { ProductInput, UpdateProductInput } from "../validate/product.validate";

export const createProductService = async (
  data: ProductInput & { images: string[] }
): Promise<IProductModel> => {
  const product = await Product.create({
    ...data,
  });
  return product;
};

import { paginationObject } from "../utils/pagination";
import { PaginationInput } from "../interface/pagination.interface";

export const listProductsService = async (pagination: PaginationInput = {}) => {
  const { skip, resultPerPage, sort, page } = paginationObject(pagination);

  const baseFilter = { isDeleted: { $ne: true } };

  const [products, totalProducts] = await Promise.all([
    Product.find(baseFilter)
      .sort(sort)
      .skip(skip)
      .limit(resultPerPage)
      .select({ isDeleted: 0 }),
    Product.countDocuments(baseFilter),
  ]);

  return {
    products,
    totalProducts,
    currentPage: page,
    totalPages: Math.ceil(totalProducts / resultPerPage),
    itemsPerPage: resultPerPage,
  };
};

export const getProductByIdService = async (id: string) => {
  if (!Types.ObjectId.isValid(id)) return null;

  return Product.findOne(
    { _id: id, isDeleted: { $ne: true } },
    { isDeleted: 0 }
  );
};

export const updateProductService = async (
  id: string,
  data: Partial<UpdateProductInput> & { images?: string[] }
): Promise<IProductModel | null> => {
  if (!Types.ObjectId.isValid(id)) return null;

  const updatePayload: Record<string, any> = {};
  for (const [k, v] of Object.entries(data)) {
    if (v !== undefined) updatePayload[k] = v;
  }

  const product = await Product.findByIdAndUpdate(id, updatePayload, {
    new: true,
    runValidators: true,
  });

  return product;
};

export const deleteProductService = async (
  id: string
): Promise<IProductModel | null> => {
  if (!Types.ObjectId.isValid(id)) return null;

  const product = await Product.findByIdAndUpdate(
    id,
    { $set: { isDeleted: true } },
    {
      new: true,
      runValidators: true,
      projection: { isDeleted: 0 },
    }
  );

  return product;
};
