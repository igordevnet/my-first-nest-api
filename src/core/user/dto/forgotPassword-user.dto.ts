import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDTO } from "./create-user.dto";

export class ForgotPasswordDTO extends PartialType(CreateUserDTO){
  email: string;
  password: string;
}