import bcrypt from 'bcrypt';
import config from '../configs/config.js';
import { createError } from '../utils/errorHelpers.js';

export const createHash = async (plainText: string) => {
  try {
    return await bcrypt.hash(plainText, config.HASH_SALT_ROUNDS);
  } catch (err) {
    throw createError(500, (err as Error).message);
  }
};

export const compareHash = async (plainText: string, hash: string) => {
  try {
    return await bcrypt.compare(plainText, hash);
  } catch (err) {
    throw createError(500, (err as Error).message);
  }
};
