import * as BodyParser from 'body-parser';
import * as Express from 'express';

export function init() {
  const app = Express();

  app.use(BodyParser.urlencoded({extended: true }));
  app.use(BodyParser.json());
  app.use((req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    next();
  });

  return app;
}
