import prisma from "../config/prisma.js";
import { successResponse, errorResponse } from "../utils/reponse.js";

export const getInventories = async (req, res) => {
  const inventories = await prisma.inventory.findMany();
  return successResponse(res, "Get Inventories Success", inventories);
};

export const getInventory = async (req, res) => {
  const { id } = req.params;
  const inventory = await prisma.inventory.findUnique({ where: { id } });

  if (!inventory) {
    return errorResponse(res, "Id Not Found", null, 401);
  }

  return successResponse(res, `Get Inventory by Id ${id} Success`, inventory);
};
export const createInventory = async (req, res) => {
  const { name, descripstion } = req.body;
  const inventory = await prisma.inventory.create({
    data: { name, description },
  });

  if (!name || !descripstion)
    return errorResponse(res, "Data Cannot be Null", null, 401);

  return successResponse(res, "Inventory Created", inventory);
};
export const updateInventory = async (req, res) => {};
export const deleteInventory = async (req, res) => {};
