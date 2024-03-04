import { IUsers } from "../../models/Users";

export interface ICreateUserDTO {
  email: string;
  password: string;
}

export interface IUserRepository {
  create(data: ICreateUserDTO): Promise<IUsers>;
  findByEmail(email: string): Promise<IUsers | null>;
  findById(user_id: string): Promise<IUsers | null>;
}
