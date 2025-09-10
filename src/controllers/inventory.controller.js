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
  const { name, description } = req.body;
  const inventory = await prisma.inventory.create({
    data: { name, description },
  });

  if (!name || !description)
    return errorResponse(res, "Data Cannot be Null", null, 401);

  return successResponse(res, "Inventory Created", inventory);
};
export const updateInventory = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  if (!name && !description)
    return errorResponse(res, "Data Cannot be Null", null, 401);

  try {
    const inventory = await prisma.inventory.update({
      where: { id },
      data: { name, description },
    });

    return successResponse(res, "Inventory Updated", inventory);
  } catch (error) {
    if (error.code === "P2025") {
      return errorResponse(res, `Inventory with id ${id} Not Found`, null, 404);
    }
    return errorResponse(res, "Error updating inventory", error.message, 500);
  }
};
export const deleteInventory = async (req, res) => {
  const { id } = req.params;

  try {
    const inventory = await prisma.inventory.delete({ where: { id } });

    return successResponse(res, "Inventory Deleted", inventory);
  } catch (error) {
    if (error.code === "P2025") {
      return errorResponse(res, `Inventory with id ${id} Not Found`, null, 404);
    }
    return errorResponse(res, "Error updating inventory", error.message, 500);
  }
};
