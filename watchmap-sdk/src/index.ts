import { Request, Response } from 'express'
import axios from 'axios'

type EmitterService = {
    ip: string,
    port: number | undefined,
    protocol: string
}

export const watchmapMiddleware = (request: Request, response: Response, next: Function) : any => {
    const currentService: EmitterService = {
        ip: request.ip,
        port: request.socket.localPort,
        protocol: request.protocol
    }
    if(!process.env.watchmapServerUrl){
        throw new Error('Watchmap Server Url is not defined: Add process.env.watchmapServerUrl to your .env file');
    }
    const watchmapServerUrl = process.env.watchmapServerUrl;
    // make post request to `${watchmapServerUrl}/services` with currentService in body
    axios.post(`${watchmapServerUrl}/services`, currentService)
    console.log(currentService)
    next()
}