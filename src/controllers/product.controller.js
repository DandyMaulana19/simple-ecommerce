import prisma from "../config/prisma.js";
import fs from "fs";
import path from "path";
import { successResponse, errorResponse } from "../utils/reponse.js";

const cleanImageUrl = (base, imagePath) => {
  base.replace(/\/$/, "") + "/" + imagePath.replace(/^\//, "");
};

export const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: { inventory: true },
    });

    const base = `${req.protocol}://${req.get("host")}`;

    const productsWithUrlImage = products.map((product) => ({
      ...product,
      image: product.image ? cleanImageUrl(base, product.image) : null,
    }));

    return successResponse(
      res,
      "Get All Products Success",
      productsWithUrlImage,
      200
    );
  } catch (error) {
    return errorResponse(
      res,
      "Get All Products Failed",
      { error: error.message },
      500
    );
  }
};
export const getProductsByInventoryID = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { inventoryId: id },
    });

    if (!product || product.length === 0)
      return errorResponse(res, "Product Not Found", null, 404);

    const base = `${req.protocol}://${req.get("host")}`;

    const productWithUrlImage = product.map((p) => ({
      ...p,
      image: p.image ? cleanImageUrl(base, p.image) : null,
    }));

    return successResponse(
      res,
      "Get Product By Inventory Id Success",
      productWithUrlImage,
      200
    );
  } catch (error) {
    return errorResponse(
      res,
      "Get All Products Failed",
      { error: error.message },
      500
    );
  }
};
export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) return errorResponse(res, "Product Not Found", null, 404);

    const base = `${req.protocol}://${req.get("host")}`;

    const productWithUrlImage = product.map((p) => ({
      ...p,
      image: p.image ? cleanImageUrl(base, p.image) : null,
    }));

    return successResponse(
      res,
      `Get Product by Id ${id} Success`,
      productWithUrlImage,
      200
    );
  } catch (error) {
    return errorResponse(
      res,
      "Get All Products Failed",
      { error: error.message },
      500
    );
  }
};
export const createProduct = async (req, res) => {
  try {
    const { name, price, stock, description, inventoryId } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    if (!name || !price || !stock || !description)
      return errorResponse(res, "Data Cannot be Null", null, 401);

    const product = await prisma.product.create({
      data: {
        name,
        price: parseFloat(price),
        stock: parseInt(stock),
        description,
        image,
        inventoryId,
      },
    });

    const baseUrl = `${req.protocol}://${req.get("host")}`;

    return successResponse(
      res,
      `Product Created`,
      {
        ...product,
        image: product.image ? `${baseUrl}${product.image}` : null,
      },
      200
    );
  } catch (error) {
    return errorResponse(
      res,
      "Create Product Failed",
      { error: error.message },
      500
    );
  }
};
export const updateProduct = async (req, res) => {};
export const deleteProduct = async (req, res) => {};
