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

    await prisma.serviceInstance.create({
        data: {
            ip: ip,
            port: port,
            // @ts-ignore
            service: {
                connectOrCreate: {
                    where: {
                        name: name
                    }, create: {
                        name: name
                    }
                }
            }
        }
    })

    res.status(201).end()
}
