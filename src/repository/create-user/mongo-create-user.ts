import {
  CreateUserDTO,
  ICreateUserRepository,
} from "../../controllers/create-user/protocols";
import { MongoClient } from "../../database/mongo";
import { User } from "../../models/user";
import { MongoUser } from "../mongo-protocols";

export class MongoCreateUserRepository implements ICreateUserRepository {
  async createUser(createUserDTO: CreateUserDTO): Promise<User> {
    const { insertedId } = await MongoClient.db
      .collection("users")
      .insertOne(createUserDTO);

    const userCreated = await MongoClient.db
      .collection<MongoUser>("users")
      .findOne({ _id: insertedId });

    if (!userCreated) {
      throw new Error("User is not created");
    }

    const { _id, ...user } = userCreated;

    return { id: _id.toHexString(), ...user };
  }
}
