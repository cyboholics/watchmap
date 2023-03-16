// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import prisma from "../../libs/prisma";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {name, ip, port}: {
        name: string,
        ip: string,
        port: string
    } = req.body

    const relatedService = await prisma.service.upsert({
        where: {
            name: name
        },
        update: {},
        create: {
            name: name
        }
    })

    await prisma.serviceInstance.create({
        data: {
            ip: ip,
            port: port,
            service_id: relatedService.id
        }
    })

    res.status(201).end()
}
