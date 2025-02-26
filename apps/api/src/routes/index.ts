import { Router } from "express";
import authRouter from "./auth.js";
import userRouter from "./user.js";

const router: Router = Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);

export default router;
