import { Request, Response, NextFunction } from 'express';

import Favorite from '../models/favorite.model';
import Product from '../models/product.model';

import { BadRequestError, ConflictError, NotFoundError } from '../helpers/customErrors';

/** GET */
export const getFavorites = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { user } = request.body;

    const favorites = await Favorite.find({ user: user.userId }).populate('product', 'name description price image');
    if (!favorites.length) {
      response.status(400).json('No matching favorites found');
    } else response.status(200).json(favorites);
  } catch (error: any) {
    next(error);
  }
};

/** POST */
export const createFavorite = async (request: Request, response: Response) => {
  const { user } = request.body;
  const { productId } = request.query;

  //console.log('userId', userId);
  //console.log('productId', productId);
  try {
    // Find the product
    const product = await Product.findById(productId).exec();

    if (product) {
      const newFavorite = new Favorite({
        user: user.userId,
        product: productId,
      });
      await newFavorite.save();
      return response.status(201).json(newFavorite);
    } else {
      return response.status(400).json({ message: 'El producto no existe.' });
    }
  } catch (error: any) {
    //console.log(error);
    return response.status(500).json({ message: error.message });
  }
};

/** POST */
export const createFavorites = async (request: Request, response: Response) => {
  const { user, products } = request.body;

  //console.log('userId', userId);
  //console.log('productId', productId);
  try {
    const favorites = await Favorite.create(
      products.map((productId: string) => {
        return {
          user: user.userId,
          product: productId,
        };
      }),
    );
    //await newFavorite.save();
    return response.status(201).json(favorites);
  } catch (error: any) {
    console.log(error);
    return response.status(500).json({ message: error.message });
  }
};

/** POST */
export const sinchronizeFavorites = async (request: Request, response: Response) => {
  const { user, products } = request.body;

  try {
    let filteredProducts = products;
    const currentFavorites = await Favorite.find({ user: user.userId });
    currentFavorites.forEach((cFav) => {
      filteredProducts = filteredProducts.filter((p: string) => !cFav.product.equals(p));
    });
    if (filteredProducts.length > 0) {
      const newFavorites = filteredProducts.map((productId: string) => {
        return {
          user: user.userId,
          product: productId,
        };
      });
      await Favorite.create(newFavorites);
    }

    const allFavorites = await Favorite.find({ user: user.userId }).populate('product', 'name description price image');

    return response.status(201).json(allFavorites);
  } catch (error: any) {
    console.log(error);
    return response.status(500).json({ message: error.message });
  }
};

/** DELETE */
export const deleteFavorite = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { user } = request.body;
    const { id, productId } = request.query;
    const favorite = await Favorite.find({ user: user.userId, product: productId });

    if (!favorite) {
      throw new BadRequestError(`Favorite not found`);
    }

    await Favorite.findOneAndDelete({ user: user.userId, product: productId });

    response.status(200).json({ message: `Favorite deleted successfully` });
  } catch (error: any) {
    next(error);
  }
};

/** DELETE */
export const deleteFavorites = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { user, products } = request.body;

    await Favorite.deleteMany({ user: user.userId, product: { $in: products } });

    response.status(200).json({ message: `Favorites deleted successfully` });
  } catch (error: any) {
    next(error);
  }
};

/** DELETE */
export const deleteAllFavorites = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { user } = request.body;

    await Favorite.deleteMany({});

    response.status(200).json({ message: `All favorites deleted successfully` });
  } catch (error: any) {
    next(error);
  }
};
