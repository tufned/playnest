import { NextFunction, Request, Response } from "express";
import { EnhancedError } from "../types/common.types.js";
import ResponseMapper from "../mappers/ResponseMapper.js";

const errorMiddleware = (
  err: EnhancedError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(err);
  const responseMapper = new ResponseMapper();
  const failResponse = responseMapper.toFail(err.message);
  res.status(err?.status || 500).json(failResponse);
};

export default errorMiddleware;
