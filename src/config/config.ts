import { IEndPointsAPI } from '@models/interfaces';
import * as fs from 'fs';

export class Config {
  public static getInstance(): Config {
    if (!this.instance) {
      this.instance = new Config();
    }
    return this.instance;
  }

  private static instance: Config;

  private endpointsInfo: IEndPointsAPI[];
  private constructor() {
    this.endpointsInfo = this.getConfigMap(
      `${__dirname}/endpoints/`
    );
  }

  public getConfig(name: string) {
    return this.endpointsInfo.find((endPointInfo) => endPointInfo.name === name);
  }

  public getFiles(pathDir: string): string[] {
    return fs.readdirSync(pathDir);
  }

  public getJson(filePath: string): IEndPointsAPI {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data.toString()) as IEndPointsAPI;
  }

  private getConfigMap(path: string) {
    const jsonFiles = this.getFiles(path);
    return jsonFiles.map(
      (jsonFile): IEndPointsAPI => this.getJson(path + jsonFile)
    );
  }
}
