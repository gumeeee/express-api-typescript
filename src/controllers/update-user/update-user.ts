import { User } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";
import {
  IUpdateUserController,
  IUpdateUserRepository,
  UpdateUserDTO,
} from "./protocols";

export class UpdateUserController implements IUpdateUserController {
  constructor(private readonly updateUserRepository: IUpdateUserRepository) {}

  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!id) {
        return {
          statusCode: 400,
          body: "User id is required",
        };
      }

      const allowedFieldsToUpdate: (keyof UpdateUserDTO)[] = [
        "firstName",
        "lastName",
        "password",
      ];
      const someFieldIsNotAllowedToUpdate = Object.keys(body).some(
        (key) => !allowedFieldsToUpdate.includes(key as keyof UpdateUserDTO)
      );

      if (someFieldIsNotAllowedToUpdate) {
        return {
          statusCode: 400,
          body: "Some field is not allowed to be updated",
        };
      }

      const userUpdated = await this.updateUserRepository.update(id, body);

      return {
        statusCode: 200,
        body: userUpdated,
      };
    } catch (err) {
      return {
        statusCode: 500,
        body: "Something went wrong",
      };
    }
  }
}
