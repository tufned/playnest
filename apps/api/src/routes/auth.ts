import { Router } from "express";
import asyncDecorator from "../utils/asyncDecorator.js";
import AuthController from "../controllers/AuthController.js";

const router: Router = Router();

router.post("/login", asyncDecorator(AuthController.login));
router.post("/signup", asyncDecorator(AuthController.signup));
router.get("/refresh", asyncDecorator(AuthController.refreshAccessToken));
router.get("/logout", asyncDecorator(AuthController.logout));

export default router;
