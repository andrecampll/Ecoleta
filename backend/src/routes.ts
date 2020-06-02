import express from 'express';

import ItensController from './controllers/ItensController';
import PointsController from './controllers/PointsController';

import { celebrate, Segments, Joi } from 'celebrate';

const routes = express.Router();

const itensController = new ItensController();
const pointsController = new PointsController();


routes.get('/itens', itensController.index);

routes.post('/points', celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    whatsapp: Joi.string().required(),
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
    city: Joi.string().required(),
    uf: Joi.string().required(),
    itens: Joi.required(),
  }
}), pointsController.create);

routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);


export default routes;