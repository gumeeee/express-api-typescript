import { User } from "../../models/user";

export interface UpdateUserDTO {
  firstName?: string;
  lastName?: string;
  password?: string;
}

export interface IUpdateUserRepository {
  update(id: string, UpdateUserDTO: UpdateUserDTO): Promise<User>;
}
