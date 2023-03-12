// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {Collection, Event, Script} from "postman-collection";
import * as fs from "fs";
import newman from "newman";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const collection = new Collection(JSON.parse(req.body))
    const preRequestScript = new Script({
        exec: [
            `pm.sendRequest(${process.env.PROJECT_HOST}/api/start-request?current_request=\`\$\{pm.request.url.getPath()\}\`);`
        ]
    })
    const testScript = new Script({
        exec: [
            `pm.sendRequest(${process.env.PROJECT_HOST}/api/end-request?current_request=\`\$\{pm.request.url.getPath()\}\`);`
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

    fs.writeFileSync('collection.json', JSON.stringify(collection.toJSON()))
    newman.run({
        collection: 'collection.json',
    });

    res.end()
}