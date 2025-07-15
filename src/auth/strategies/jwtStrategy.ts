import { Strategy as JwtStrategy, ExtractJwt, StrategyOptionsWithoutRequest } from "passport-jwt"
import {PassportStatic} from "passport"
import { KnexUserRepository } from "src/modules/users/infrastructure/KnexUserRepository";
import { UserFinder } from "src/modules/users/application";

export class JwtAuthStrategy {
    private options: StrategyOptionsWithoutRequest;
    private userFinder: UserFinder


    constructor(
        private repository: KnexUserRepository,
    ) {
        this.userFinder = new UserFinder(repository)
        this.options = {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.SECRET_KEY!
        }
    }

    /**
     * 
     * @param passportInstance is literally the module to type variables in ts
     */
    async init(passportInstance: PassportStatic){
        passportInstance.use(
            new JwtStrategy(this.options, async (jwtpayload: {sub: string, role: string}, done: Function)=>{
                try {
                    const { sub } = jwtpayload
                    const user = await this.userFinder.execute(sub);
                    if(!user) return done(null, false)
                    return done(null, user)
                } catch (error) {
                    return done(error,false)
                }
            })
        )

    }
}