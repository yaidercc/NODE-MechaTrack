import { Response } from "express";

export interface ResponseStructure<T> {
    data?: T,
    res: Response,
    message: string,
    errors?: string,
}