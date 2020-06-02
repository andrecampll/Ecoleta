import { Request, Response } from 'express';
import knex from '../database/connection';

class PointsController {
  async create(request:Request, response:Response) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items,
    } = request.body;
  
    const trx = await knex.transaction();

    const point = {
      image: 'fake',
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    };
  
    const insertedIds = await trx('points').insert(point);
  
    const point_id = insertedIds[0];
  
    const pointItens = items.map((item_id: number) => {
      return {
        item_id,
        point_id,
      };
    }) 
  
    await trx('point_itens').insert(pointItens);
  
    return response.json({
      id: point_id,
      ...point,
    });
  }

  async index(request: Request, response:Response) {
    const points = await knex('points').select('*');
  
    return response.json(points);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const point = await knex('points').where('id', id).first();

    if (!point) {
      return response.status(400).json({ error: 'Point not found.' });
    }

    const itens = await knex('itens')
      .join('point_itens', 'itens.id', '=', 'point_itens.item_id')
      .where('point_itens.point_id', id);

    return response.json({ point, itens });
  }
}

export default PointsController;