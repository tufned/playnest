import { NextFunction, RequestHandler, Request, Response } from 'express';
import { unauthorizedError } from '../utils/errorHelpers.js';
import TokenService from '../services/TokenService.js';
import { EnhancedRequest } from '../types/common.types.js';

const authMiddleware: RequestHandler = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) throw unauthorizedError();

  const tokenService = new TokenService();
  const tokenPayload = tokenService.validateAccessToken(token);
  if (!tokenPayload) throw unauthorizedError();

  (req as EnhancedRequest).user = tokenPayload;
  next();
};

export default authMiddleware;
