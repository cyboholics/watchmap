import express, {Express} from 'express';
import { Request, Response } from 'express';
import {watchmapMiddleware} from '../../watchmap-sdk/src'

const app: Express = express();

app.use(watchmapMiddleware)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
})