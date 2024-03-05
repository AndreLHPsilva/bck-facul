import { IUserRepository } from "../../../../database/repositories/IUserRepository";
import { ApiError } from "../../../../errors/ApiError";
import { sign } from "jsonwebtoken";
import { compare } from "bcrypt";
import { inject, injectable } from "tsyringe";
import { IUsers } from "../../../../models/Users";

interface IRequestDTO {
  email: string;
  password: string;
}

interface IResponseDTO {
  token: string;
  user: IUsers;
}

@injectable()
class SigninUseCase {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository
  ) {}

  async execute({ email, password }: IRequestDTO): Promise<IResponseDTO> {
    const verifyAlreadyExistsUser = await this.userRepository.findByEmail(
      email
    );

    if (!verifyAlreadyExistsUser) {
      throw new ApiError("E-mail ou senha incorretos.");
    }

    const passwordIsSame = await compare(
      password,
      verifyAlreadyExistsUser.password!
    );

    if (!passwordIsSame) {
      throw new ApiError("E-mail ou senha incorretos.");
    }

    const token = sign({}, process.env.JWT_SECRET as string, {
      subject: verifyAlreadyExistsUser.id,
      expiresIn: "1d",
    });

    return {
      token,
      user: verifyAlreadyExistsUser,
    };
  }
}

export { SigninUseCase };
