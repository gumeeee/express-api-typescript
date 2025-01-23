import { IGetUsersRepository } from "../../controllers/get-users/protocols";
import { User } from "../../models/user";

export class MongoGetUsersRepository implements IGetUsersRepository {
  async getUsers(): Promise<User[]> {
    return [
      {
        firstName: "Guilherme",
        lastName: "Moura",
        email: "guilherme@email.com",
        password: "123456",
      },
    ];
  }
}
