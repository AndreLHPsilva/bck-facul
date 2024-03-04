import { IReturnApi } from "@helpers/returnApi";
import { IUser } from "@models/Users";


declare global {
    namespace Express {

        export interface Request {
            auth_user?: IUser;
        }

        interface Response {
            returnApi(data?: IReturnApi): Response;
        }
    }

}

