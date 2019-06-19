import { Router } from 'express';
import ExampleController from '../controllers/example';

export class ExampleRoute {
  public readonly PATH = '/v1/examples';
  private exampleController: ExampleController;

  constructor() {
    this.exampleController = new ExampleController();
  }

  public init(app: Router) {
    app.post(this.PATH, this.exampleController.add);
    app.put(`${this.PATH}/:id`, this.exampleController.update);
    app.get(this.PATH, this.exampleController.findAll);
    app.get(`${this.PATH}/:id`, this.exampleController.findById);
  }
}
