import { User } from "../../models/user";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { CreateUserDTO, ICreateUserRepository } from "./protocols";

import validator from "validator";

export class CreateUserController implements IController {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}

  async handle(
    httpRequest: HttpRequest<CreateUserDTO>
  ): Promise<HttpResponse<User>> {
    try {
      const { body } = httpRequest;

      const requiredFields = ["firstName", "lastName", "email", "password"];

      for (const field of requiredFields) {
        if (!body?.[field as keyof CreateUserDTO]?.length) {
          return {
            statusCode: 400,
            body: `Fields ${field} is required`,
          };
        }
      }

      const emailIsValid = validator.isEmail(body!.email);

      if (!emailIsValid) {
        return {
          statusCode: 400,
          body: `Email is invalid`,
        };
      }

      const user = await this.createUserRepository.createUser(body!);

      return {
        statusCode: 201,
        body: user,
      };
    } catch (err) {
      return {
        statusCode: 500,
        body: "Something went wrong",
      };
    }
  }
}
