import { z } from "zod";
import { authConfig } from "@playnest/core";

const UserUpdateSchema = z
  .object({
    nickname: z
      .string()
      .min(authConfig.nickname.minLength)
      .max(authConfig.nickname.maxLength)
      .trim()
  })
  .partial()
  .strict();

export default UserUpdateSchema;
