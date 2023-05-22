import { Request, Response, NextFunction } from 'express';

import CartModel from '../models/cart.model';
import OrderModel from '../models/order.model';
import orderModel from '../models/order.model';
import mongoose from 'mongoose';

/** GET */
export const getOrders = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const allOrders = await OrderModel.find({}).populate({
      path: 'items',
      populate: { path: 'product', model: 'Product' },
    });
    console.log(allOrders);
    response.status(200).json(allOrders);
  } catch (error: any) {
    next(error);
  }
};

/** GET */
export const getOrderById = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { id } = request.params;

    const order = await OrderModel.findById(id);

    if (order) {
      response.status(200).json(order);
    } else {
      response.status(400).json({ message: `Order with id ${id} not exist.` });
    }
  } catch (error: any) {
    next(error);
  }
};

/** POST */
export const createOrder = async (request: Request, response: Response, next: NextFunction) => {
  const { user, total, items, buyerData } = request.body;

  // Check if price is a valid number with two decimal places
  const priceRegex = /^\d+(\.\d{1,2})?$/;
  if (!priceRegex.test(total)) {
    response.status(401).json({ message: `Total price must be a valid number with two decimal places` });
  }

  try {
    if (user.userId) {
      // Check cart status before create a order
      const order = new OrderModel({ client: user.userId, subtotal: total, total: total, buyerData: buyerData });
      for (const item of items) {
        order.items.push(item);
      }

      await order.save();
      await order.populate([
        {
          path: 'items',
          populate: {
            path: 'product',
            populate: [
              { path: 'memory', select: 'name -_id' },
              { path: 'category', select: 'name -_id' },
              { path: 'graphic', select: 'name -_id' },
              { path: 'keyboard', select: 'name -_id' },
              { path: 'processor', select: 'name -_id' },
              { path: 'brand', select: 'name -_id' },
              { path: 'screen', select: 'name -_id' },
              { path: 'software', select: 'name -_id' },
              { path: 'storage', select: 'name -_id' },
            ],
          },
        },
        { path: 'buyerData' },
      ]);

      response.status(201).json(order);
    } else {
      response.status(400).json({ message: 'Client id not provided.' });
    }
  } catch (error: any) {
    response.status(400).json({ message: error.message });
  }
};

/* PUT */
export const updateOrder = async (request: Request, response: Response, next: NextFunction) => {
  const { id } = request.params;
  const { user, total, items, buyerData } = request.body;

  // Check if price is a valid number with two decimal places
  const priceRegex = /^\d+(\.\d{1,2})?$/;
  if (!priceRegex.test(total)) {
    response.status(401).json({ message: `Total price must be a valid number with two decimal places` });
  }

  try {
    // Find the order
    console.log('id', id);
    const order = await OrderModel.findById(id);
    console.log('findedId', order?._id);

    if (order) {
      order.subtotal = total;
      order.total = total;
      order.buyerData = buyerData;

      // Remove current items.
      while (order.items.length > 0) order.items.pop();
      // Add new items
      for (const item of items) {
        order.items.push(item);
      }

      await order.save();

      await order.populate([
        {
          path: 'items',
          populate: {
            path: 'product',
            populate: [
              { path: 'memory', select: 'name -_id' },
              { path: 'category', select: 'name -_id' },
              { path: 'graphic', select: 'name -_id' },
              { path: 'keyboard', select: 'name -_id' },
              { path: 'processor', select: 'name -_id' },
              { path: 'brand', select: 'name -_id' },
              { path: 'screen', select: 'name -_id' },
              { path: 'software', select: 'name -_id' },
              { path: 'storage', select: 'name -_id' },
            ],
          },
        },
        { path: 'buyerData' },
      ]);

      response.status(201).json(order);
    } else {
      response.status(400).json({ message: `La orden nro ${id} no existe` });
    }
  } catch (error: any) {
    response.status(400).json({ message: error.message });
  }
};

export const getOrderByClient = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const id = request.tokenData.userId;

    OrderModel.aggregate([
      {
        $match: {
          client: new mongoose.Types.ObjectId(id),
        },
      },
      {
        $unwind: {
          path: '$items',
        },
      },
      {
        $lookup: {
          from: 'products',
          localField: 'items.product',
          foreignField: '_id',
          as: 'item',
        },
      },
      {
        $group: {
          _id: '$_id',
          client: { $first: '$client' },
          status: { $first: '$status' },
          total: { $first: '$total' },
          items: { $push: { $first: '$item' } },
        },
      },
      {
        $project: {
          _id: 1,
          client: 1,
          status: 1,
          total: 1,
          items: 1,
          date: { $toDate: '$_id' },
        },
      },
    ])
      .then((result: any) => {
        console.dir(result, { depth: null });

        response.status(200).json(result);
      })
      .catch((error: any) => {
        response.status(400).json({ message: `Order with id ${id} not exist.` });
      });
  } catch (error: any) {
    next(error);
  }
};
