import { Request, Response } from "express";
import { container } from "tsyringe";

import { IUsers } from "../../../../models/Users";
import { SignInValidation } from "./SignInValidation";
import { SigninUseCase } from "./SigninUseCase";

class SigninController {
  async handle(req: Request, res: Response) {
    const data = SignInValidation.validate(req.body);

    const signinUseCase = container.resolve(SigninUseCase);
    const response = await signinUseCase.execute(data);

    const {
      user: { password, ...dataUser },
    } = response;

    const userReturn: Omit<IUsers, "password"> = dataUser;

    return res.returnApi({
      data: { token: response.token, user: userReturn },
      statusHTTP: 200,
      message: "Login realizado com sucesso",
      developerMessage: "Sign in with success",
    });
  }
}

export { SigninController };
