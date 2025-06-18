import { HttpStatusCode } from "axios"
import { ResponseStructure } from "./interfaces/httpResponses.interfaces";

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
    static badRequest<T>({ data, res, message = "Bad request", errors }: ResponseStructure<T>) {
        return res.status(HttpStatusCode.BadRequest).json({
            message,
            errors,
            data
        })
    }
    static notFound<T>({ data, res, message = "Not found", errors }: ResponseStructure<T>) {
        return res.status(HttpStatusCode.NotFound).json({
            message,
            errors
        })
    }
    static validationsFail<T>({ res, message = "Validations fail", errors }: ResponseStructure<T>) {
        return res.status(HttpStatusCode.BadRequest).json({
            message,
            errors
        })
    }
    static internalServerError<T>({ res, message = "Unexpected error ocurreed", errors }: ResponseStructure<T>) {
        return res.status(HttpStatusCode.InternalServerError).json({
            errors
        })
    }
}