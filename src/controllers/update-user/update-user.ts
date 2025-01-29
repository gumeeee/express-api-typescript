import { User } from "../../models/user";
import { badRequest, okResponse, serverError } from "../helpers";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IUpdateUserRepository, UpdateUserDTO } from "./protocols";

export class UpdateUserController implements IController {
  constructor(private readonly updateUserRepository: IUpdateUserRepository) {}

  async handle(
    httpRequest: HttpRequest<UpdateUserDTO>
  ): Promise<HttpResponse<User | string>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!body) {
        return badRequest("Body is required.");
      }

      if (!id) {
        badRequest("Id is required.");
      }

      const allowedFieldsToUpdate: (keyof UpdateUserDTO)[] = [
        "firstName",
        "lastName",
        "password",
      ];
      const someFieldIsNotAllowedToUpdate = Object.keys(body!).some(
        (key) => !allowedFieldsToUpdate.includes(key as keyof UpdateUserDTO)
      );

      if (someFieldIsNotAllowedToUpdate) {
        return badRequest("Some field is not allowed to update");
      }

      const userUpdated = await this.updateUserRepository.update(id, body!);

      return okResponse<User>(userUpdated);
    } catch (err) {
      return serverError();
    }
  }
}
