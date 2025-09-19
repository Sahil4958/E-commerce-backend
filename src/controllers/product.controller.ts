import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  createProductService,
  deleteProductService,
  getProductByIdService,
  listProductsService,
  updateProductService,
} from "../service/product.service";
import { handleError } from "../utils/errHandler";
import { messages } from "../utils/message";
import { apiResponse } from "../utils/apiResponse";
import { Cloudinary } from "../utils/cloudinary";
import { validateFiles } from "../middleware/upload.middleware";
import { UpdateProductInput } from "../validate/product.validate";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const files = req.files as Express.Multer.File[];
    const fileError = validateFiles(files);
    if (fileError) {
      return apiResponse(res, StatusCodes.BAD_REQUEST, fileError);
    }

    const uploadedImages = await Promise.all(
      files.map(async (file) => {
        const result = await Cloudinary.uploadToCloudinary(file, "emp");
        return result.secure_url;
      })
    );

    const product = await createProductService({
      ...req.body,
      images: uploadedImages,
    });

    apiResponse(res, StatusCodes.CREATED, messages.PRODUCT_CREATED, product);
  } catch (error) {
    handleError(res, error);
  }
};

export const listProducts = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page);
    const itemsPerPage = Number(req.query.itemsPerPage);
    const sortField =
      typeof req.query.sortField === "string" ? req.query.sortField : undefined;
    const sortOrder =
      req.query.sortOrder === "asc"
        ? "asc"
        : req.query.sortOrder === "desc"
        ? "desc"
        : undefined;

    const result = await listProductsService({
      page: Number.isFinite(page) && page > 0 ? page : 1,
      itemsPerPage:
        Number.isFinite(itemsPerPage) && itemsPerPage > 0 ? itemsPerPage : 10,
      sortField,
      sortOrder,
    });

    return apiResponse(res, StatusCodes.OK, "Product list fetched", result);
  } catch (error) {
    handleError(res, error);
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await getProductByIdService(id);

    if (!product) {
      return apiResponse(res, StatusCodes.NOT_FOUND, "Product not found", []);
    }

    return apiResponse(res, StatusCodes.OK, "Product fetched", product);
  } catch (error) {
    return apiResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Something went wrong",
      {
        error: (error as Error).message,
      }
    );
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const body = req.body as UpdateProductInput;

    const files = (req.files as Express.Multer.File[]) || [];
    let uploadedImages: string[] | undefined;

    if (files.length > 0) {
      const fileError = validateFiles(files);
      if (fileError) {
        return apiResponse(res, StatusCodes.BAD_REQUEST, fileError);
      }
      uploadedImages = await Promise.all(
        files.map(async (file) => {
          const result = await Cloudinary.uploadToCloudinary(file, "emp");
          return result.secure_url;
        })
      );
    }

    const payload: Partial<UpdateProductInput> = {
      ...body,
      ...(uploadedImages ? { images: uploadedImages } : {}),
    };

    const updated = await updateProductService(id, payload);

    if (!updated) {
      return apiResponse(res, StatusCodes.NOT_FOUND, "Product not found");
    }

    return apiResponse(res, StatusCodes.OK, "Product updated", updated);
  } catch (error) {
    handleError(res, error);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await deleteProductService(id);

    if (!product) {
      return apiResponse(
        res,
        StatusCodes.NOT_FOUND,
        messages.PRODUCT_NOT_FOUND
      );
    }

    return apiResponse(res, StatusCodes.OK, messages.PRODUCT_DELETED);
  } catch (error) {
    handleError(res, error);
  }
};
