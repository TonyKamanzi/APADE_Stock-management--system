import express from "express";
import {
  createSupplier,
  deleteSupplier,
  getSupplier,
  getSupplierById,
  updateSupplier,
} from "../controllers/supplier.controller.js";
const router = express.Router();

router.post("/add-supplier", createSupplier);
router.get("/all-suppliers", getSupplier);
router.get("/get-supplier/:id", getSupplierById);
router.put("/edit-supplier/:id", updateSupplier);
router.delete("/delete-supplier/:id", deleteSupplier);
export default router;
