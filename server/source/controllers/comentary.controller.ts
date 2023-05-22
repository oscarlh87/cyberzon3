import { Request, Response, NextFunction } from 'express';

import Comentary from '../models/comentary.model';
import Order from '../models/order.model';

import { BadRequestError, ConflictError, NotFoundError } from '../helpers/customErrors';

/** GET */
export const getComentary = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const productId = request.query.productId;
    let query = {};
    // const name = request.query.name;
    // if (name) {
    //   const regex = new RegExp(`^${name}`, 'i');
    //   query = { name: regex };
    // }
    if (productId) query = { product: productId };

    const comentary = await Comentary.find(query).populate('client', 'username email avatar');
    if (!comentary.length) {
      throw new BadRequestError('No matching comentaries found');
    }
    response.status(200).json(comentary);
  } catch (error: any) {
    next(error);
  }
};

/** POST */
export const createComentary = async (req: Request, res: Response) => {
  const { user, productId, score, descripcion } = req.body;

  //console.log('userId', userId);
  //console.log('productId', productId);
  try {
    // Get all orders of the user
    const userOrders = await Order.find({ client: user.userId })
      .populate({ path: 'items', populate: { path: 'product' } })
      .exec();

    if (userOrders.length > 0) {
      //console.log('userOrders', userOrders);
      // Comprobación adicional
      let productFinded = false;

      for (let i = 0; i < userOrders.length; i++) {
        const order = userOrders[i];
        //console.log('order', order.items[0]);
        if (order.items.find((item) => item.product._id.equals(productId))) {
          productFinded = true;
          break;
        }
      }

      if (productFinded) {
        const newComentary = new Comentary({
          client: user.userId,
          product: productId,
          score,
          descripcion,
        });
        await newComentary.save();
        return res.status(201).json(newComentary);
      } else {
        return res.status(400).json({ message: 'El usuario no ha comprado este producto.' });
      }
    } else {
      return res.status(400).json({ message: 'El usuario no ha comprado este producto.' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Hubo un error al crear el comentario.' });
  }
};

/** PATCH */
export const updatePartialComentary = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { id } = request.params;
    const name = request.body.name.trim().toUpperCase();

    const comentary = await Comentary.findById(id);

    if (!comentary) {
      throw new NotFoundError(`Comentary with id ${id} not found`);
    }

    if (name === comentary.name.toUpperCase()) {
      throw new ConflictError(`New name is the same as current name`);
    }

    const existingComentary = await Comentary.findOne({ name });

    if (existingComentary && existingComentary.id !== id) {
      throw new ConflictError(`Comentary with name ${name} already exists`);
    }

    comentary.name = name;

    const updatedComentary = await comentary.save();

    response.status(200).json(updatedComentary);
  } catch (error: any) {
    next(error);
  }
};

/** PUT */
export const updateComentary = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { id } = request.params;
    const {descripcion,score} = request.body;

    const updatedComentary = await Comentary.findByIdAndUpdate(id, {descripcion,score} , { new: true });

    if (!updatedComentary) {
      throw new NotFoundError(`Comentary with id ${id} not found`);
    }

    response.status(200).json(updatedComentary);
  } catch (error: any) {
    next(error);
  }
};

/** DELETE */
export const deleteComentary = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { id } = request.params;
    const comentary = await Comentary.findById(id);

    if (!comentary) {
      throw new BadRequestError(`Brand with id ${id} not found`);
    }

    await Comentary.findByIdAndDelete(id);

    response.status(200).json({ message: `Comentary deleted successfully` });
  } catch (error: any) {
    next(error);
  }
};
