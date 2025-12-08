// src/controllers/user.controller.ts
import { Request, Response, NextFunction } from "express";
import { userService } from "../services/user.service";

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userService.getAll();
        res.json(users);
    } catch (error) {
        next(error);
    }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userService.getById(req.params.id);
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        next(error);
    }
};