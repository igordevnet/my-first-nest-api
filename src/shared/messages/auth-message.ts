
import { User } from "src/user/entities/user.entity";
import { Message } from "./message";

export interface AuthMessage extends Message {
  token: string;
  user: User;
}