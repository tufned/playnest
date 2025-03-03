import { z } from "zod";
import { authConfig } from "@playnest/core";

const UserUpdatePasswordSchema = z
  .object({
    password: z.string().trim(),
    newPassword: z
      .string()
      .min(authConfig.password.minLength)
      .max(authConfig.password.maxLength)
      .trim()
  })
  .strict();

export default UserUpdatePasswordSchema;
