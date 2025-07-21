import jwt from "jsonwebtoken"
import { requiredEnv } from "../common";
export const generateJWT = (id: string) => {
    return new Promise((resolve, reject) => {
        const payload = { id };
        jwt.sign(
            payload,
            requiredEnv(process.env.SECRET_KEY, "SECRET_KEY"),
            {
                expiresIn: "2h"
            },
            (err, token) => {
                if (err) {
                    console.log(err)
                    reject("Unexpected error when generating token")
                } else {
                    resolve(token)
                }
            }
        )

    })
}