import express from 'express';

import multer from 'multer';
import multerConfig from './config/multer';

import ItensController from './controllers/ItensController';
import PointsController from './controllers/PointsController';

import { celebrate, Segments, Joi } from 'celebrate';

const routes = express.Router();
const upload = multer(multerConfig)

const itensController = new ItensController();
const pointsController = new PointsController();


routes.get('/itens', itensController.index);

routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);

routes.post('/points', upload.single('image'), pointsController.create);

// celebrate({
//   [Segments.BODY]: {
//     name: Joi.string().required(),
//     email: Joi.string().email().required(),
//     whatsapp: Joi.string().min(10).max(11).required(),
//     latitude: Joi.number().required(),
//     longitude: Joi.number().required(),
//     city: Joi.string().required(),
//     uf: Joi.string().required().length(2),
//     itens: Joi.required(),
//   }
// })

export default routes;