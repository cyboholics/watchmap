require('dotenv').config();
import express, {Express} from 'express';
import { Request, Response } from 'express';
import watchmapInitializer from 'watchmap-sdk'

const app: Express = express();
const watchmapMiddleware: any = watchmapInitializer('http://localhost:3000');

app.use(watchmapMiddleware)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
})

app.listen(3001, () => {
  console.log('Example app listening on port 3001!');
})