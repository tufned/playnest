import { EnhancedError } from '../types/common.types.js';
import { errors } from '../constants/errors.js';

export const createError = (status: number, message: string): EnhancedError => {
  const error = new Error(message) as EnhancedError;
  error.status = status;
  return error;
};

export const unauthorizedError = () => {
  return createError(403, errors.accessDenied);
};
