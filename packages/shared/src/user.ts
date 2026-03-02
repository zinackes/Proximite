import { z } from "zod";

export const UserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

export type UserDto = z.infer<typeof UserSchema>;
