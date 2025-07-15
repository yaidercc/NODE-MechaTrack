import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { HttpResponses } from "src/common/httpResponses/httpResponses";
export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("jwt", { session: false }, (err, user, info) => {
        if (err) return next(err)
        if (!user) return HttpResponses.unAuthorized(res)

        req.user = user
        next()
    })
}


