// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import prisma from "../../libs/prisma";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {name}: { name: string } = req.body
    const endpoint_to_map =  await prisma.endpoint.findFirst({
        where: {
            // @ts-ignore
            is_mapped: false
        }
    })
    if(!endpoint_to_map){
        // handle number of queries later versions
        return res.end()
    }

    await prisma.endpointService.create({
        data: {
            service: {
                connect: {
                    name: name
                }
            },
            endpoint: {
                connect: {
                    id: endpoint_to_map.id
                }
            }
        }
    })

    res.status(201).end()
}
