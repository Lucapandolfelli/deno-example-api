import { Router } from "../../deps.ts";
import {
  createProduct,
  deleteProductById,
  getAllProducts,
  getProductById,
  updateProductById,
} from "../handlers/product.handler.ts";

export const router = new Router()
  .get("/api/products", getAllProducts)
  .get("/api/products/:id", getProductById)
  .post("/api/products", createProduct)
  .put("/api/products/:id", updateProductById)
  .delete("/api/products/:id", deleteProductById);
