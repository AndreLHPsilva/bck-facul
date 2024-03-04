import { Request, Response } from "express";
import { CreateValidation } from "./CreateValidation";
import { container } from "tsyringe";
import { CreateUseCase } from "./CreateUseCase";
import { IUsers } from "../../../../models/Users";

class CreateController {
  async handle(req: Request, res: Response) {
    const data = CreateValidation.validate(req.body);

    const createUseCase = container.resolve(CreateUseCase);
    const response = await createUseCase.execute(data);

    const { password, ...user } = response;

    const userReturn: Omit<IUsers, "password"> = user;

    return res.returnApi({
      data: userReturn,
      statusHTTP: 201,
      message: "Cadastro realizado com sucesso!",
      developerMessage: "User Created",
    });
  }
}

export { CreateController };
