import { User } from "../../models/user";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IDeleteUserRepository } from "./protocols";

export class DeleteUserController implements IController {
  constructor(private readonly deleteUserRepository: IDeleteUserRepository) {}
  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) {
        return {
          statusCode: 400,
          body: "Id is required",
        };
      }

      const userDeleted = await this.deleteUserRepository.delete(id);

      return {
        statusCode: 200,
        body: userDeleted,
      };
    } catch (err) {
      return {
        statusCode: 500,
        body: "Something went wrong",
      };
    }
  }
}
