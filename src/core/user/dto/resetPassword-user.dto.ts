import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDTO } from "./create-user.dto";

export class ResetPasswordDTO extends PartialType(CreateUserDTO){
  email: string;
  password: string;
}