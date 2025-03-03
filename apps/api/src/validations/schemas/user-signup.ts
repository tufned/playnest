import { z } from "zod";
import { authConfig } from "@playnest/core";

const UserSignupSchema = z
  .object({
    nickname: z
      .string()
      .min(authConfig.nickname.minLength)
      .max(authConfig.nickname.maxLength)
      .trim(),
    password: z
      .string()
      .min(authConfig.password.minLength)
      .max(authConfig.password.maxLength)
      .trim(),
    email: z.string().email().min(authConfig.email.minLength)
  })
  .strict();

export default UserSignupSchema;
