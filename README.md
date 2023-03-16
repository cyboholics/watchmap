# watchmap
A simple service to map microservices and API endpoints to create a dependency graph. Built over Express.js and utilizes express middlewares/request API.

The High Level Design

1. Middleware (implimented as an sdk) acts as live watcher for the incoming request to an API of a particular microservice from the concerned macroservice.
2. The watchmap server runs as a next.js application which recieves anlytics logs from middleware to process the API dependency graph.
3. The analytics dashboard and watchmap server make up as next app, the analytics dashboard provide visual presentation of API dependency graph.