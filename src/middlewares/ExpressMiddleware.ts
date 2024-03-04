import { ApiError } from "../errors/ApiError";
import { NextFunction, Request, Response } from "express";
import { ReturnApi } from "@helpers/returnApi";

export class ExpressMiddleware {
  static handleErrors(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (err instanceof ApiError) {
      return ReturnApi.messageReturn(res, {
        data: null,
        developerMessage: err.message,
        message: err.message,
        statusHTTP: err.statusCode,
      });
    }

    return ReturnApi.messageReturn(res, {
      data: null,
      developerMessage: err.message,
      message: err.message,
      statusHTTP: 500,
    });
  }
}
