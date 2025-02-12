import { z } from "zod";

const UserLoginSchema = z.object({
  password: z.string().trim(),
  email: z.string().email()
});

export default UserLoginSchema;
