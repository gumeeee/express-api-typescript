import { User } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";

export interface CreateUserDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ICreateUserRepository {
  createUser(createUserDTO: CreateUserDTO): Promise<User>;
}
