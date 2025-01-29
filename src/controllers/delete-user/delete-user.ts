import { User } from "../../models/user";
import { badRequest, okResponse, serverError } from "../helpers";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IDeleteUserRepository } from "./protocols";

export class DeleteUserController implements IController {
  constructor(private readonly deleteUserRepository: IDeleteUserRepository) {}
  async handle(
    httpRequest: HttpRequest<any>
  ): Promise<HttpResponse<User | string>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) {
        return badRequest("Id is required");
      }

      const userDeleted = await this.deleteUserRepository.delete(id);

      return okResponse<User>(userDeleted);
    } catch (err) {
      return serverError();
    }
  }
}
