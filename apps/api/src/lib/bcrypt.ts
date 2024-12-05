import bcrypt from 'bcrypt';
import config from '../configs/config.js';
import { createError } from '../utils/errorHelpers.js';

export const hashString = async (plaintextPassword: string) => {
  try {
    return await bcrypt.hash(plaintextPassword, config.HASH_SALT_ROUNDS);
  } catch (err) {
    throw createError(500, (err as Error).message);
  }
};
