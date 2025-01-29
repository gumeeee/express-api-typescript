import { User } from "../../models/user";

export interface IDeleteUserRepository {
  delete(id: string): Promise<User>;
}
