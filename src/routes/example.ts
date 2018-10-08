import { Router } from 'express';
import { FieldRequest } from '../commons/enums/validator';
import { RequestValidator } from '../commons/validators';
import ExampleController from '../controllers/example';
import { Jois } from '../models';

export const init = (server: Router) => {
  const exampleController = new ExampleController();
  server.post(
    '/v1/example',
    RequestValidator.validate(Jois.example, FieldRequest.Body),
    exampleController.add.bind(exampleController)
  );
  server.put(
    '/v1/example/:id',
    RequestValidator.validate(Jois.example, FieldRequest.Body),
    RequestValidator.validate(Jois.exampleId, FieldRequest.Params),
    exampleController.update.bind(exampleController)
  );
  server.patch(
    '/v1/example/:id',
    RequestValidator.validate(Jois.exampleId, FieldRequest.Params),
    exampleController.updateParams.bind(exampleController)
  );
  server.get(
    '/v1/example/:id',
    RequestValidator.validate(Jois.exampleId, FieldRequest.Params),
    RequestValidator.validate(Jois.fields, FieldRequest.Query),
    exampleController.findById.bind(exampleController)
  );
  server.get(
    '/v1/example',
    RequestValidator.validate(Jois.fields, FieldRequest.Query),
    exampleController.findAll.bind(exampleController)
  );
};
