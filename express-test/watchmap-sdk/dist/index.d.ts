import { Request, Response } from 'express';
declare const watchmapInitializer: () => (request: Request, response: Response, next: Function) => any;
export default watchmapInitializer;
