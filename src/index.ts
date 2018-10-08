import { Router } from 'express';
import { CheckRoute, ExampleRoute } from './routes/';

export const init = (server: Router) => {
  CheckRoute.init(server);
  ExampleRoute.init(server);
};
