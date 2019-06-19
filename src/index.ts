import { Router } from 'express';
import { ExampleRoute } from './routes/example';

export const init = (server: Router) => {
  new ExampleRoute().init(server);
};
