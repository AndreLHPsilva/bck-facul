import { CreateController } from "../modules/User/usecases/Create/CreateController";
import { SigninController } from "../modules/User/usecases/SignIn/SigninController";
import express from "express";

export const userRoutes = express.Router();

const createController = new CreateController();
const signinController = new SigninController();

userRoutes.post("/", async (req, res) => {
  return await createController.handle(req, res);
});

userRoutes.post("/signin", async (req, res) => {
  return await signinController.handle(req, res);
});

