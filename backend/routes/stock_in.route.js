import express from "express"
import { createStockIn, deleteStockin, getStockinById, getStockins, updateStockin } from "../controllers/stock_in.controller.js"

const router = express.Router()

router.post("/make-stockin", createStockIn)
router.get("/all-stockins", getStockins)
router.get("/get-stockin/:id", getStockinById)
router.put("/edit-stockin/:id", updateStockin)
router.delete("/delete-stockin/:id", deleteStockin)

export default router