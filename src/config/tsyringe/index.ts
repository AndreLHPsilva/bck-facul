import { IUserRepository } from "@database/repositories/IUserRepository";


import { UserPrismaRepository } from "@database/repositories/prisma/UserPrismaRepository";
import { container } from "tsyringe";

container.registerSingleton<IUserRepository>(
  "UserRepository",
  UserPrismaRepository
);

