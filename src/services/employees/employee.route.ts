import express, { Request, Response } from "express";
import { getEmployees, createEmployee } from "./employee.controller";

const router = express.Router();

router.get("/", getEmployees);
router.post("/", createEmployee);

export default router;
