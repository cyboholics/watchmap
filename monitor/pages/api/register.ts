// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import prisma from "../../libs/prisma";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log(req.body)
    const {name, ip, port}: {
        name: string,
        ip: string,
        port: string
    } = req.body

    let relatedService = await prisma.service.findFirst({
        where: {
            name: name
        }
    })
    if (!relatedService) {
        relatedService = await prisma.service.create({
            data: {
                name: name || 'unknown'
            }
        })
    }
    await prisma.serviceInstance.create({
        data: {
            ip: ip,
            port: port,
            service: {
                connect: {
                    id: relatedService.id
                }
            }
        }
    })

    res.status(201).end()
}
