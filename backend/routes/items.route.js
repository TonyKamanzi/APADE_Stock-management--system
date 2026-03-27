import express from "express";
import {
  createItem,
  deleteItem,
  getAllItems,
  getItemById,
  updateItem,
} from "../controllers/items.controller.js";

const router = express.Router();

router.post("/add-item", createItem);
router.get("/all-items", getAllItems);
router.get("/get-item/:id", getItemById);
router.put("/edit-item/:id", updateItem);
router.delete("/delete-item/:id", deleteItem);

export default router;
