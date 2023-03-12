// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import prisma from "../../libs/prisma";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const currentRequest = req.query.current_request
    if (!currentRequest) {
        return res.status(400).end()
    }
    if (typeof currentRequest !== 'string') {
        return res.status(400).end()
    }
    const endpoint = await prisma.endpoint.findFirst({
        where: {
            name: currentRequest
        }
    })
    if (!endpoint) {
        return res.end()
    }
    await prisma.endpoint.update({
        where: {
            id: endpoint.id
        },
        data: {
            is_mapped: true
        }
    })
    res.end()
}
