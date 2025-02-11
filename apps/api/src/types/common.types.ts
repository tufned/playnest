import { Request } from "express";
import { IUserJwtPayload } from "@playnest/shared/types/models/user.types";

export interface EnhancedError extends Error {
  status: number;
}

export interface EnhancedRequest extends Request {
  user: IUserJwtPayload;
}
