import { Request } from "express";
import { UserJwtPayloadDTO } from "@playnest/core/types/domains/user.types";

export interface EnhancedError extends Error {
  status: number;
}

export interface EnhancedRequest extends Request {
  user: UserJwtPayloadDTO;
}
