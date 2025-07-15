import express, { Express } from "express";
import { Server as HttpServer } from "http";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet"
import passport from "passport"
import { JwtAuthStrategy } from "./auth/strategies";
import { development, testing } from "./config/database/Knexfile";
import { KnexUserRepository } from "./modules/users/infrastructure/KnexUserRepository";

export class Server {
    private app: Express;
    private paths;
    private server!: HttpServer;
    public port: number;
    

    constructor(

    ) {
        this.port = Number(process.env.PORT) || 4400
        this.app = express();

        this.paths = {
            users: "/api/users"
        };

        this.middlewares();
        this.routes();

    }

    middlewares(): void {

        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(morgan("dev"))
        this.app.use(helmet())

        const knexConfig =  process.env.NODE_ENV == "test" ? testing : development
        
        const userRepository = new KnexUserRepository(knexConfig)
        const jwtStrategy = new JwtAuthStrategy(userRepository);

        jwtStrategy.init(passport)

        this.app.use(passport.initialize())
    }

    private routes(): void { }

    listen(): void {
        this.server = this.app.listen(this.port, () => {
            console.log("Server started")
        })
    }

    get appServer(): Express {
        return this.app; 
    }

    close(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (this.server) {
                this.server.close((err) => {
                    if (err) {
                        return reject(err);
                    }
                    console.log("Server closed");
                    resolve();
                });
            } else {
                resolve();
            }
        });
    }

}