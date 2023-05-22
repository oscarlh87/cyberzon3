import { Request, Response, NextFunction } from 'express';

//import { Request as JWTRequest } from 'express-jwt';

import CartModel from '../models/cart.model';

/** GET */
export const getCarts = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const allCarts = await CartModel.find({}).populate({
      path: 'items',
      populate: { path: 'product', model: 'Product' },
    });
    response.status(200).json(allCarts);
  } catch (error: any) {
    next(error);
  }
};

/** GET */
export const getCartById = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { id } = request.params;

    const cart = await CartModel.findById(id);

    if (cart) {
      await cart.populate({
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
      });
      response.status(200).json(cart);
    } else {
      response.status(400).json({ message: `Cart with id ${id} not exist.` });
    }
  } catch (error: any) {
    next(error);
  }
};

/** GET */
export const getUserCart = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { user } = request.body;

    console.log('user', user);

    const cart = await CartModel.findOne({ client: user?.userId });

    if (cart) {
      await cart.populate({
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
      });
      response.status(200).json(cart);
    } else {
      response.status(400).json({ message: `Cart with not exist.` });
    }
  } catch (error: any) {
    next(error);
  }
};

export const createCart = async (request: Request, response: Response) => {
  const { clientId, total, items } = request.body;
  // Check if price is a valid number with two decimal places
  const priceRegex = /^\d+(\.\d{1,2})?$/;
  if (!priceRegex.test(total)) {
    response.status(401).json({ message: `Total price must be a valid number with two decimal places` });
  }

  try {
    if (clientId) {
      // Check client id with user auth?
      // Check cart status before create a order
      const newCart = new CartModel({ client: clientId, total: total });
      for (const item of items) {
        newCart.items.push({ ...item, _id: item.product });
      }

      await newCart.save();

      response.status(201).json(newCart);
    } else {
      response.status(400).json({ message: 'Client id not provided.' });
    }
  } catch (error: any) {
    response.status(500).json({ message: error.message });
  }
};

export const addProductToCart = async (request: Request, response: Response) => {
  const { cartId, productId, quantity } = request.body;

  try {
    const cart = await CartModel.findById(cartId);
    if (!cart) return response.status(401).json({ message: 'Cart not found' });

    const cartItem = cart.items.id(productId);
    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      cart.items.push({ _id: productId, product: productId, quantity: quantity });
    }
    await cart.save();
    await cart.populate({
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
    });
    return response.status(201).json(cart);
  } catch (error: any) {
    response.status(500).json({ message: error.message });
  }
};

export const removeProductFromCart = async (request: Request, response: Response) => {
  const { user, productId, quantity } = request.body;

  try {
    const cart = await CartModel.findOne({ client: user.userId });
    if (!cart) return response.status(401).json({ message: 'Cart not found' });

    const cartItem = cart.items.id(productId);
    console.log('cartItem', cartItem);
    if (cartItem) {
      if (cartItem.quantity - quantity <= 0) cartItem.deleteOne();
      else cartItem.quantity -= quantity;
      await cart.save();
      await cart.populate({
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
      });
    }

    return response.status(201).json(cart);
  } catch (error: any) {
    response.status(500).json({ message: error.message });
  }
};

export const clearCart = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { user } = request.body;

    const userId = user.userId;

    // Check if the user has a cart
    const cart = await CartModel.findOne({ client: userId });

    if (cart) {
      cart.total = 0;
      cart.subTotal = 0;
      while (cart.items.length > 0) {
        cart.items.shift();
      }
      await cart.save();
      response.status(200).json(cart);
    } else {
      response.status(400).json({ message: `Cart not exist.` });
    }
  } catch (error: any) {
    next(error);
  }
};

export const updateCart = async (request: Request, response: Response) => {
  const { user, total, items } = request.body;
  // Check if price is a valid number with two decimal places
  // const priceRegex = /^\d+(\.\d{1,2})?$/;
  // if (!priceRegex.test(total)) {
  //   response.status(401).json({ message: `Total price must be a valid number with two decimal places` });
  // }

  const userId = user.userId;

  try {
    // Check if the user has a cart
    let cart = await CartModel.findOne({ client: userId });
    if (cart) {
      // Update cart with items from request. Add only item not already exists
      for (const item of items) {
        console.log('item', item);
        const finded = cart.items.id(item.product.id || item.product._id);
        console.log('finded', finded);
        if (finded === null) {
          cart.items.push({
            _id: item.product._id || item.product.id,
            product: item.product._id || item.product.id,
            quantity: item.quantity,
          });
        }
      }
    } else {
      // Create a cart for the logged user
      cart = new CartModel({ client: userId, total: total });
      for (const item of items) {
        cart.items.push({
          _id: item.product._id || item.product.id,
          product: item.product._id || item.product.id,
          quantity: item.quantity,
        });
      }
    }

    await cart.save();
    await cart.populate({
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
    });

    response.status(201).json(cart);
  } catch (error: any) {
    response.status(500).json({ message: error.message });
  }
};
