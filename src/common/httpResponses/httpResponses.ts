import { HttpStatusCode } from "axios"
import { ResponseStructure } from "./interfaces/httpResponses.interfaces";
import { Response } from "express";

export class HttpResponses {
    static ok<T>({ data, res, message = "Success" }: ResponseStructure<T>) {
        return res.status(HttpStatusCode.Ok).json({
            message,
            data
        })
    }
    static created<T>({ data, res, message = "Resource(s) created" }: ResponseStructure<T>) {
        return res.status(HttpStatusCode.Created).json({
            message,
            data
        })
    }

    static unAuthorized(res: Response, message = "Unauthorized") {
        return res.status(HttpStatusCode.Unauthorized).json({
            message
        })
    }

    static badRequest<T>({ data, res, message = "Bad request", errors }: ResponseStructure<T>) {
        return res.status(HttpStatusCode.BadRequest).json({
            message,
            errors,
            data
        })
    }
    static notFound(res: Response, message = "Not found") {
        return res.status(HttpStatusCode.NotFound).json({
            message
        })
    }
    static validationsFail<T>({ res, message = "Validations fail", errors }: ResponseStructure<T>) {
        return res.status(HttpStatusCode.BadRequest).json({
            message,
            errors
        })
    }
    static internalServerError(res: Response, message = "Unexpected error ocurreed",) {
        return res.status(HttpStatusCode.InternalServerError).json({
            message
        })
    }
}