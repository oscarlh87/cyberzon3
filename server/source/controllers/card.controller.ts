import { Request, Response, NextFunction } from 'express';

import Card from '../models/card.models';
import { BadRequestError, ConflictError, NotFoundError } from '../helpers/customErrors';


/** GET */
export const getCardByID = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const ticket = await Card.findById(id)
      .populate('product', 'name')
      .populate('client', 'name')
 

    if (!ticket) {
      throw new NotFoundError(`Card not found`);
    }

    const _ticket = {
         _id: ticket._id,
         name: ticket.name,
         client: ticket.client.name,
         product: ticket.product.name,
         cant: ticket.cant,
         p_unit: ticket.p_unit,
         p_subtotal: ticket.p_subtotal,
         p_total: ticket.p_total,
         tax: ticket.tax,
         __v: ticket.__v,

    };

    res.status(200).json(_ticket);
  } catch (error: any) {
    next(error);
  }
};


/** GET */
export const getCard = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const name = request.query.name;
    let query = {};
    if (name) {
      const regex = new RegExp(`^${name}`, 'i');
      query = { name: regex };
    }
    const cards = await Card.find(query);
    if (!cards.length) {
      throw new BadRequestError('No matching Card found');
    }
    response.status(200).json(cards);
  } catch (error: any) {
    next(error);
  }
};

/** POST */
export const createCard = async (request: Request, response: Response, next: NextFunction) => {
  const {
  name,
  client,
  product,
  cant,
  p_unit,
  p_subtotal,
  p_total,
  tax,
  
  } = request.body
 /* Check if price is a valid number with two decimal places */
 const priceRegex = /^\d+(\.\d{1,2})?$/;
 if (!priceRegex.test(p_unit)) {
   throw new BadRequestError(`Price must be a valid number with two decimal places`);
 }

  try {
  
    const card = new Card({ 
      name,
      product,
      client,
      cant,
      p_unit,
      p_subtotal,
      p_total,
      tax,
       });
    await card.save();
    response.status(201).json(card);
  } catch (error: any) {
    next(error);
  }
};


/** PATCH */
export const updatePartialCard = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { id } = request.params;
    const name = request.body.name.trim().toUpperCase();

    const card = await Card.findById(id);

    if (!card) {
      throw new NotFoundError(`Card with id ${id} not found`);
    }

    if (name === card.name.toUpperCase()) {
      throw new ConflictError(`New Card is the same as current name`);
    }

    const existingCard = await Card.findOne({ name });

    if (existingCard && existingCard.id !== id) {
      throw new ConflictError(`Card with name ${name} already exists`);
    }

   card.name = name;

    const updatedCard = await card.save();

    response.status(200).json(updatedCard);
  } catch (error: any) {
    next(error);
  }
};

/** PUT */
export const updateCard = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { id } = request.params;
    const { name, cant, p_subtotal, p_total } = request.body;

    const updatedCard = await Card.findByIdAndUpdate(id, { cant, name, p_subtotal, p_total }, { new: true });

    if (!updatedCard) {
      throw new NotFoundError(`Card with id ${id} not found`);
    }

    response.status(200).json(updatedCard);
  } catch (error: any) {
    next(error);
  }
};

/** DELETE */
export const deleteCard = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { id } = request.params;
    const card = await Card.findById(id);

    if (!card) {
      throw new BadRequestError(`Card with id ${id} not found`);
    }

    await Card.findByIdAndDelete(id);

    response.status(200).json({ message: `Card deleted successfully` });
  } catch (error: any) {
    next(error);
  }
};
