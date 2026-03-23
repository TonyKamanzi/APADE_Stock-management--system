import express from "express"
import { createStockOut, deleteStockout, getStockOutById, getStockouts, updateStockout } from "../controllers/stock_out.controller.js";
const router = express.Router()

router.post("/make-stock-out", createStockOut);
router.get("/all-stock-outs", getStockouts);
router.get("/get-stock-out/:id", getStockOutById);
router.put("/edit-stock-out/:id", updateStockout);
router.delete("/delete-stock-out/:id", deleteStockout);

export default router