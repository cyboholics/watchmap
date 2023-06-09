# watchmap
A simple service to map microservices and API endpoints to create a dependency graph. Built over Express.js and utilizes express middlewares/request API.

The High Level Design

1. Middleware (implimented as an sdk) acts as live watcher for the incoming request to an API of a particular microservice from the concerned macroservice.
2. The watchmap server runs as a next.js application which recieves anlytics logs from middleware to process the API dependency graph.
3. The analytics dashboard and watchmap server make up as next app, the analytics dashboard provide visual presentation of API dependency graph.

## Expressjs SDK

In your server, add these lines
```sh
$ npm i @cyboholics/watchmap-js-sdk
```
```ts
import express from 'express';
import watchmap from '@cyboholics/watchmap-js-sdk';
...
const app = express();
app.use(await watchmap())
...
```

## Django SDK
```sh
$ pip install watchmap-django-sdk
```
```py
MIDDLEWARE = [
     ...
    'watchmap-django-sdk.watchmap_sdk.WatchmapMiddleware'
     ...
]
```
## monitor snapshots
![image](https://user-images.githubusercontent.com/74463091/227615430-8ba3eae4-00b8-44eb-85bf-24dfc8bd620a.png)
![image](https://user-images.githubusercontent.com/74463091/227615439-c3b41615-0f29-4ef1-a9f4-d0896524ea14.png)

