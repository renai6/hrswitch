import express, { Request, Response } from "express";
import { getUsers, createUser } from "./user.controller";

const router = express.Router();

router.get("/", getUsers);
router.post("/", createUser);

export default router;
