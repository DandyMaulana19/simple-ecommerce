import express, { Router } from "express";
import { upload } from "../middlewares/upload.js";
import {
  getProducts,
  getProductsByInventoryID,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/inventories/:id", getProductsByInventoryID);
router.get("/:id", getProduct);
router.post("/", verifyToken, upload.single("image"), createProduct);
router.put("/:id", verifyToken, upload.single("image"), updateProduct);
router.delete("/:id", verifyToken, deleteProduct);

export default router;
