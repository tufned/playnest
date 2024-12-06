import { NextFunction } from 'express';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // TODO: write auth logic that will verify jwt accessToken before every protected endpoint
};

export default authMiddleware;
