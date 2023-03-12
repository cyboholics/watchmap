// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import prisma from "../../libs/prisma";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'GET') {
        return res.status(405).end()
    }

    const endpointServices = await prisma.endpointService.findMany({
        include: {
            service: true,
            endpoint: true
        }
    })
    const endpoints = await prisma.endpoint.findMany()
    const services = await prisma.service.findMany()

    const data:{
        [key: string]: Set<string>
    } = {}

    for (const endpoint of endpoints) {
        data[endpoint.name] = new Set()
    }
    for (const endpointService of endpointServices) {
        data[endpointService.endpoint.name].add(endpointService.service.name)
    }

    const ret:{
        endpoint: string,
        services: string[]
    }[] = []

    for (const key in data) {
        ret.push({
            endpoint: key,
            services: Array.from(data[key])
        })
    }
    const allEndPoints = endpoints.map(endpoint => endpoint.name)
    const allServices = services.map(service => service.name)
    console.log(ret, allEndPoints)
    res.status(200).json({
        allEndPoints: allEndPoints,
        allServices: allServices,
        mapping: ret
    })
}
