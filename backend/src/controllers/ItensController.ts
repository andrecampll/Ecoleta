import { Request, Response } from 'express';
import knex from '../database/connection';

class ItensController {
  async index(request: Request, response: Response) {
    try {
      const itens = await knex('itens').select('*');
  
      const serializedItens = itens.map(item => {
        return {
          id: item.id,
          title: item.title,
          image_url: `http://localhost:3333/uploads/${item.image}`,
        };
      });
    
      return response.json(serializedItens);
    } catch(err) {
      console.log(err);
      return response.status(400).json({ message: 'Error' });
    }
  }
};

export default ItensController;