import { NextFunction, Request, Response } from 'express';

const errorMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(err);
  res.status(500).json({
    success: false,
    message: err.message
  });
};

export default errorMiddleware;
