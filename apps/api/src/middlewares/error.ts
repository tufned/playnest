import { NextFunction, Request, Response } from "express";
import { fail } from "@playnest/utils";
import { EnhancedError } from "../types/common.types.js";

const errorMiddleware = (
  err: EnhancedError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(err);
  res.status(err?.status || 500).json(fail(err.message));
};

export default errorMiddleware;
