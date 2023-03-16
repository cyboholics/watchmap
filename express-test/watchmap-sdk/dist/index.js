"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const axios_1 = __importDefault(require("axios"));
const os_1 = require("os");
const parseNetInterface = (a) => {
    let ipv4 = null;
    for (const key in a) {
        for (let i = 0; i < a[key].length; i++) {
            const obj = a[key][i];
            if (obj["family"] === 'IPv4' && !obj["internal"]) {
                ipv4 = obj["address"];
                return ipv4;
            }
        }
    }
    return "Not Found";
};
const validateEnv = (WATCHMAP_SERVICE_NAME, WATCHMAP_SERVER_REGISTER_URL, PORT) => {
    let errMsg = "";
    if (!WATCHMAP_SERVICE_NAME)
        errMsg += "Service Name not defined: Add process.env.WATCHMAP_SERVICE_NAME to your .env file\n";
    if (!WATCHMAP_SERVER_REGISTER_URL)
        errMsg += "Watchmap Server Url not defined: Add process.env.WATCHMAP_SERVER_REGISTER_URL to your .env file\n";
    if (!PORT)
        errMsg += "Your App Port not defined: Add process.env.PORT to your .env file\n";
    if (errMsg)
        throw new Error(errMsg);
};
const watchmapInitializer = () => {
    validateEnv(process.env.WATCHMAP_SERVICE_NAME, process.env.WATCHMAP_SERVER_REGISTER_URL, process.env.PORT);
    axios_1.default.post(`${process.env.WATCHMAP_SERVER_REGISTER_URL}`, JSON.stringify({
        name: process.env.WATCHMAP_SERVER_NAME,
        ip: parseNetInterface((0, os_1.networkInterfaces)()),
        port: process.env.PORT,
    }))
        .then((res) => {
        console.log("Service Registered with Watchmap");
        console.log(res);
    })
        .catch((err) => {
        console.log(err);
        throw new Error("Failed to Register Service with Watchmap");
    });
    const watchmapMiddleware = (request, response, next) => {
        const serviceName = process.env.WATCHMAP_SERVICE_NAME;
        axios_1.default.post(`${process.env.WATCHMAP_SERVER_REQUEST_MONITOR_URL}`, JSON.stringify({
            name: serviceName
        })).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        });
        next();
    };
    return watchmapMiddleware;
};
exports.default = watchmapInitializer;