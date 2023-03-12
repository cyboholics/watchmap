import {Request, Response} from 'express'
import axios from 'axios'

type EmitterService = {
    ip: string,
    port: number | undefined,
    protocol: string,
    path: string
}

const watchmapMiddleware = (request: Request, response: Response, next: Function): any => {
    const currentService: EmitterService = {
        ip: request.ip,
        port: request.socket.localPort,
        protocol: request.protocol,
        path: request.path
    }
    if (!process.env.WATCHMAP_SERVER_URL) {
        throw new Error('Watchmap Server Url not defined: Add process.env.WATCHMAP_SERVER_URL to your .env file');
    }
    // make post request to `${watchmapServerUrl}` with currentService in body
    const serviceName = process.env.SERVICE_NAME
    axios.post(`${process.env.WATCHMAP_SERVER_URL}`, serviceName)
    console.log(currentService)
    next()
}
export default watchmapMiddleware