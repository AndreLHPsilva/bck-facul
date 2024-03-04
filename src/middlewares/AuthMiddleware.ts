import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { ApiError } from "../errors/ApiError";
import "dotenv/config";
import { UserPrismaRepository } from "../database/repositories/prisma/UserPrismaRepository";

interface IPayload {
  sub: string;
}

export class AuthMiddleware {
  async auth(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new ApiError("Token de acesso não informado", 401);
    }

    const [, token] = authHeader.split(" ");

    try {
      const { sub: user_id } = verify(
        token,
        process.env.JWT_SECRET as string
      ) as IPayload;

      const usersRepository = new UserPrismaRepository();
      const user = await usersRepository.findById(user_id);

      if (!user) {
        throw new ApiError("Usuario não encontrado");
      }

      req.auth_user = user;

      next();
    } catch (error) {
      throw new ApiError("O token de acesso é invalido", 401);
    }
  }
}
