import { User } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";

export interface UpdateUserDTO {
  firstName?: string;
  lastName?: string;
  password?: string;
}

export interface IUpdateUserController {
  handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User>>;
}

export interface IUpdateUserRepository {
  update(id: string, UpdateUserDTO: UpdateUserDTO): Promise<User>;
}
