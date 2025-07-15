import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { HttpResponses } from "src/common/httpResponses/httpResponses";
import { UserInterface } from "src/modules/users/interfaces/user.interface";

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("jwt", { session: false }, (err: any, user: UserInterface) => {
        if (err) return next(err)
        if (!user) return HttpResponses.unAuthorized(res)

        req.user = user
        next()
    })
}


