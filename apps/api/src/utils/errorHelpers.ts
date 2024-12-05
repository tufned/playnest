import { EnhancedError } from '../types/common.types.js';

export const createError = (status: number, message: string): EnhancedError => {
  const error = new Error(message) as EnhancedError;
  error.status = status;
  return error;
};
