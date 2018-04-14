import { Router } from 'express';
import { IDatabase } from '../../config/database';
import ExampleController from '../controllers/example';

export default function(server: Router) {
  const exampleController = new ExampleController();

  server.post('/v1/example', exampleController.add.bind(exampleController));
  server.put('/v1/example/:id', exampleController.update.bind(exampleController));
  server.get('/v1/example/:id', exampleController.findById.bind(exampleController));
  server.get('/v1/examples', exampleController.findAll.bind(exampleController));
  server.delete('/v1/example/:id', exampleController.remove.bind(exampleController));
}
