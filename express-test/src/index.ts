require('dotenv').config();
import express, {Express} from 'express';
import { Request, Response } from 'express';
import watchmapInitializer from 'watchmap-sdk'

const app: Express = express();
async function setup(){
  const watchmapMiddleware = await watchmapInitializer()

  app.use(watchmapMiddleware)

  app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
  })

  app.listen(process.env.PORT, () => {
    console.log('Example app listening on port 3001!');
  })
}

setup()
