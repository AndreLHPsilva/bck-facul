import { Response } from "express";

export interface IReturnApi {
  message?: string | null;
  developerMessage?: string | null | undefined;
  data?: object | null;
  statusHTTP?: number;
}

class ReturnApi {
  public static messageReturn(res: Response, data: IReturnApi) {
    const returnData = {
      data: data.data ?? null,
      statusHTTP: data.statusHTTP ?? 200,
      message: data.message ?? "",
      developerMessage: data.developerMessage ?? "",
    };

    return res.status(returnData.statusHTTP).json(returnData);
  }
}

export { ReturnApi };
