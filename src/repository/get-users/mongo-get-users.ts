import { IGetUsersRepository } from "../../controllers/get-users/protocols";
import { MongoClient } from "../../database/mongo";
import { User } from "../../models/user";

export class MongoGetUsersRepository implements IGetUsersRepository {
  async getUsers(): Promise<User[]> {
    const users = await MongoClient.db
      .collection<User>("users")
      .find({})
      .toArray();

    return users.map(({ _id, ...user }) => {
      const { id, ...rest } = user;
      return {
        id: _id.toHexString(),
        ...rest,
      };
    });
  }
}
