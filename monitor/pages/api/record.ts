// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {Collection, Event, Script} from "postman-collection";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const collection = new Collection(JSON.parse(req.body))
    const preRequestScript = new Script({
        // TODO: update so that it sends a request to the start-request url
        exec: [
            'pm.collectionVariables.get("service");',
        ]
    })
    const testScript = new Script({
        // TODO: update so that it sends a request to the end-request url
        exec: [
            'pm.collectionVariables.get("service");'
        ]
    })

    const preRequestEvent = new Event({
        listen: 'prerequest',
        script: preRequestScript
    })

    const testEvent = new Event({
        listen: 'test',
        script: testScript
    })

    collection.events.add(preRequestEvent)
    collection.events.add(testEvent)
    res.end()
}
