// src/routes/user.routes.ts
import { Router } from "express";
import { getUsers, getUserById } from "../controllers/user.controller";

export const router = Router();

router.get("/", getUsers);
router.get("/:id", getUserById);