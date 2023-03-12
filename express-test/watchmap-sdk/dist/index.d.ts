import { Request, Response } from 'express';
declare const watchmapInitializer: (watchmapServerUrl: string) => (request: Request, response: Response, next: Function) => any;
export default watchmapInitializer;
