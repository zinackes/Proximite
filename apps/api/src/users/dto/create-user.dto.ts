import { createZodDto } from "nestjs-zod";
import { UserSchema } from "@repo/shared";

export class CreateUserDto extends createZodDto(UserSchema) {}
