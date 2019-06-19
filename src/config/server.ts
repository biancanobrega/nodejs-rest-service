import { basicLog, LogLevels } from '@spms-apps/ts-logger';
import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as express from 'express';
import { Express, NextFunction, Request, Response } from 'express';
import * as helmet from 'helmet';

export class Server {
  public get app() {
    return this.appInstance;
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new Server();
    }
    return this.instance;
  }

  private static instance: Server;
  private appInstance: Express;

  private constructor() {
    this.appInstance = express();
  }

  public async init() {
    dotenv.config({
      path: __dirname + `/env/.env.${process.env.NODE_ENV}`
    });

    this.app
      .use(bodyParser.urlencoded({ extended: true }))
      .use(bodyParser.json())
      .use(helmet())
      .use((req: Request, res: Response, next: NextFunction) => {
        next();
      });

    this.app.listen(process.env.PORT, () => {
      basicLog(
        LogLevels.info,
        __filename,
        `App is running at http://${process.env.HOST}:${process.env.PORT} in ${
          process.env.NODE_ENV
        } mode`
      );
    });
  }
}
