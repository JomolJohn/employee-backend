// src/controllers/user.controller.ts
import { Request, Response } from "express";
import { userService } from "../services/user.service";

export const getUsers = (req: Request, res: Response) => {
const users = userService.getAll();
res.json(users);
};

export const getUserById = (req: Request, res: Response) => {
const user = userService.getById(req.params.id);
if (!user) return res.status(404).json({ message: "User not found" });
res.json(user);
};