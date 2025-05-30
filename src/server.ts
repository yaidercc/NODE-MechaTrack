import express, { Express } from "express";
import { Server as HttpServer } from "http";
import cors from "cors";
import morgan from "morgan";

type Paths = {}

export class Server {
    constructor(
        private app: Express,
        private paths: Paths,
        private server: HttpServer,
        public port: number
    ) {
        this.port = Number(process.env.PORT) || 4400
        this.app = express();

        this.paths = {};

        this.middlewares();
        this.routes();

    }

    middlewares(): void {
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(morgan("dev"))
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