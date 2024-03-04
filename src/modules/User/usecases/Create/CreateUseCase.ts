import { IUserRepository } from "../../../../database/repositories/IUserRepository";
import { ApiError } from "../../../../errors/ApiError";
import { IUsers } from "../../../../models/Users";
import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

interface ICreateDTO {
  email: string;
  password: string;
}

@injectable()
class CreateUseCase {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository
  ) {}

  async execute({ email, password }: ICreateDTO): Promise<IUsers> {
    const verifyAlreadyExistsEmail = await this.userRepository.findByEmail(
      email
    );

    if (verifyAlreadyExistsEmail) {
      throw new ApiError("Este e-mail já esta sendo utilizado");
    }

    const passordHashed = await hash(password, 8);

    const userCreated = await this.userRepository.create({
      email,
      password: passordHashed,
    });

    return userCreated;
  }
}

export { CreateUseCase };
