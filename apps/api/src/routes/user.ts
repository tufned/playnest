import { Router } from "express";
import asyncDecorator from "../utils/asyncDecorator.js";
import UserController from "../controllers/UserController.js";

const userRouter: Router = Router();

userRouter.get("/", asyncDecorator(UserController.getAllUsers));
userRouter.get("/:id", asyncDecorator(UserController.getUser));
userRouter.patch("/:id", asyncDecorator(UserController.updateUser));
userRouter.patch("/:id/password", asyncDecorator(UserController.updateUserPassword));

export default userRouter;
