import express from "express";
import {
  createDepartment,
  deleteDepartment,
  getDepartmentById,
  getDepartments,
  updateDepartment,
} from "../controllers/department.controller.js";

const router = express.Router();

router.post("/add-department", createDepartment);
router.get("/all-departments", getDepartments);
router.get("/get-department/:id", getDepartmentById);
router.put("/edit-department/:id", updateDepartment);
router.delete("/delete-department/:id", deleteDepartment);

export default router;
