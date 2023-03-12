"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const watchmapInitializer = (watchmapServerUrl) => {
    console.log(process.env);
    const watchmapMiddleware = (request, response, next) => {
        const currentService = {
            ip: request.ip,
            port: request.socket.localPort,
            protocol: request.protocol,
            path: request.path
        };
        if (!watchmapServerUrl) {
            throw new Error('Watchmap Server Url not defined: Add process.env.WATCHMAP_SERVER_URL to your .env file');
        }
        const serviceName = {
            name: ""
        };
        axios_1.default.post(`${watchmapServerUrl}`, serviceName);
        console.log(currentService);
        next();
    };
    return watchmapMiddleware;
};
exports.default = watchmapInitializer;
