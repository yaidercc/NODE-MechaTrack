"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
class Server {
    constructor(app, paths, server, port) {
        this.app = app;
        this.paths = paths;
        this.server = server;
        this.port = port;
        this.port = Number(process.env.PORT) || 4400;
        this.app = (0, express_1.default)();
        this.paths = {};
        this.middlewares();
        this.routes();
    }
    middlewares() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
        this.app.use((0, morgan_1.default)("dev"));
    }
    routes() { }
    listen() {
        this.server = this.app.listen(this.port, () => {
            console.log("Server started");
        });
    }
    get appServer() {
        return this.app;
    }
    close() {
        return new Promise((resolve, reject) => {
            if (this.server) {
                this.server.close((err) => {
                    if (err) {
                        return reject(err);
                    }
                    console.log("Server closed");
                    resolve();
                });
            }
            else {
                resolve();
            }
        });
    }
}
exports.Server = Server;
