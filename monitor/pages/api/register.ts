// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import prisma from "../../libs/prisma";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {name, ip, port}: {
        name: string,
        ip: string,
        port: number
    } = req.body
}
