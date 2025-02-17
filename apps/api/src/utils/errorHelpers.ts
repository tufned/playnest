import { EnhancedError } from "../types/common.types.js";
import { errors } from "../constants/errors.js";
import { ZodError } from "zod";

export const createError = (status: number, message: string): EnhancedError => {
  const error = new Error(message) as EnhancedError;
  error.status = status;
  return error;
};

export const unauthorizedError = () => {
  return createError(403, errors.accessDenied);
};

export const zodValidationError = (error: unknown) => {
  const zodErrors = (error as ZodError).errors;
  const errorsString =
    zodErrors.length > 0 &&
    zodErrors
      .map((issue) => {
        return `${issue.path.join(", ")}: ${issue.message}`;
      })
      .join("\n");
  return createError(400, errorsString || errors.badRequest);
};
