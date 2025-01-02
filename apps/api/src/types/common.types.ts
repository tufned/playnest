import { Request } from 'express';
import { IUserJwtPayload } from '@playnest/utils';

export interface EnhancedError extends Error {
  status: number;
}

export interface EnhancedRequest extends Request {
  user: IUserJwtPayload;
}
