import { ApiError } from "../../../../errors/ApiError";
import { z } from "zod";

interface IData {
  email: string;
  password: string;
}

class CreateValidation {
  static validate(data: IData): IData {
    const createUserSchema = z.object({
      email: z
        .string({
          required_error: "Email é obrigatorio",
          invalid_type_error: "Email deve ser uma string",
        })
        .email("O campo deve ser um email valido")
        .trim(),
      password: z
        .string({
          required_error: "Senha é obrigatorio",
          invalid_type_error: "Senha deve ser uma string",
        })
        .min(9, "Senha deve possuir no mínimo 9 caracteres"),
    });

    const validatedeDate = createUserSchema.safeParse(data);

    if (!validatedeDate.success) {
      throw new ApiError(validatedeDate.error.errors[0].message, 400);
    }

    return data;
  }
}

export { CreateValidation };
