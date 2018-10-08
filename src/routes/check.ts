import {  Request, Response, Router } from 'express';

export const init = (server: Router) => {
  server.get('/v1/example/check', (req: Request, res: Response) => res.send('Service running.'));
};
