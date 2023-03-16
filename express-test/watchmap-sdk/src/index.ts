require('dotenv').config();
import {Request, Response} from 'express'
import axios from 'axios'
import {networkInterfaces} from 'os'

const parseNetInterface: Function = (a: object): string => {
    let ipv4 = null
    for (const key in a) {
        // @ts-ignore
        for (let i = 0; i < a[key].length; i++) {
            // @ts-ignore
            const obj = a[key][i];
            if (obj["family"] === "IPv4" && !obj["internal"]) {
                ipv4 = obj["address"]
                return ipv4
            }
        }
    }
    return "Not Found"
}

const validateEnv: Function = (
    WATCHMAP_SERVICE_NAME: string | undefined,
    WATCHMAP_SERVER_REGISTER_URL: string | undefined,
    PORT: string | undefined): void => {
    let errMsg: string = ""
    if(!WATCHMAP_SERVICE_NAME) errMsg += "Service Name not defined: Add process.env.WATCHMAP_SERVICE_NAME to your .env file\n"
    if(!WATCHMAP_SERVER_REGISTER_URL) errMsg += "Watchmap Server Url not defined: Add process.env.WATCHMAP_SERVER_REGISTER_URL to your .env file\n"
    if(!PORT) errMsg += "Your App Port not defined: Add process.env.PORT to your .env file\n"
    if(errMsg) throw new Error(errMsg)
}

const watchmapInitializer = () => {
    validateEnv(process.env.WATCHMAP_SERVICE_NAME, process.env.WATCHMAP_SERVER_REGISTER_URL, process.env.PORT)
    // API Call to register service with watchmap client
    axios.post(`${process.env.WATCHMAP_SERVER_REGISTER_URL}`, JSON.stringify({
        name: process.env.WATCHMAP_SERVER_NAME,
        ip: parseNetInterface(networkInterfaces()),
        port: process.env.PORT,
    }))
        .then((res) => {
            console.log("Service Registered with Watchmap")
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
            throw new Error("Failed to Register Service with Watchmap")
        })
    /**
     * Middleware to be used in express app
     * @param request: Express Request Object
     * @param response: Express Response Object
     * @param next: Express Next Function
     */
    const watchmapMiddleware = (request: Request, response: Response, next: Function): any => {
        const serviceName = process.env.WATCHMAP_SERVICE_NAME
        axios.post(`${process.env.WATCHMAP_SERVER_REQUEST_MONITOR_URL}`, JSON.stringify({
            name: serviceName
        })).then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })
        next()
    }
    return watchmapMiddleware
}
export default watchmapInitializer