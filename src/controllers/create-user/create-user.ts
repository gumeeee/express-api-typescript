import { User } from "../../models/user";
import { badRequest, createdResponse, serverError } from "../helpers";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { CreateUserDTO, ICreateUserRepository } from "./protocols";

import validator from "validator";

export class CreateUserController implements IController {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}

  async handle(
    httpRequest: HttpRequest<CreateUserDTO>
  ): Promise<HttpResponse<User | string>> {
    try {
      const { body } = httpRequest;

      const requiredFields = ["firstName", "lastName", "email", "password"];

      for (const field of requiredFields) {
        if (!body?.[field as keyof CreateUserDTO]?.length) {
          return badRequest(`Fields ${field} is required`);
        }
      }

      const emailIsValid = validator.isEmail(body!.email);

      if (!emailIsValid) {
        return badRequest("Invalid email");
      }

      const user = await this.createUserRepository.createUser(body!);

      return createdResponse<User>(user);
    } catch (err) {
      return serverError();
    }
  }
}
