import express from "express";
import {
  createCategory,
  deleteCategory,
  getCategory,
  getCategoryById,
  updateCategory,
} from "../controllers/category.controller.js";

const router = express.Router();

router.post("/add-category", createCategory);
router.get("/get-all-categories", getCategory);
router.get("/get-category/:id", getCategoryById);
router.put("/edit-category/:id", updateCategory);
router.delete("/delete-category/:id", deleteCategory);

export default router;
