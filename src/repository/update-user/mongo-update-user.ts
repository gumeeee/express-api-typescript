import { ObjectId } from "mongodb";
import {
  IUpdateUserRepository,
  UpdateUserDTO,
} from "../../controllers/update-user/protocols";
import { MongoClient } from "../../database/mongo";
import { User } from "../../models/user";
import { MongoUser } from "../mongo-protocols";

export class MongoUpdateUserRepository implements IUpdateUserRepository {
  async update(id: string, updateUserDTO: UpdateUserDTO): Promise<User> {
    await MongoClient.db.collection("users").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...updateUserDTO,
        },
      }
    );

    const userUpdated = await MongoClient.db
      .collection<MongoUser>("users")
      .findOne({ _id: new ObjectId(id) });

    if (!userUpdated) {
      throw new Error("User not found");
    }

    const { _id, ...user } = userUpdated;

    return { id: _id.toHexString(), ...user };
  }
}
