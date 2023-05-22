import { Request, Response, NextFunction } from 'express';

import Brand from '../models/brand.model';

import { BadRequestError, ConflictError, NotFoundError } from '../helpers/customErrors';

/** GET */
export const getBrand = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const name = request.query.name;
    let query = {};
    if (name) {
      const regex = new RegExp(`^${name}`, 'i');
      query = { name: regex };
    }
    const brands = await Brand.find(query);
    if (!brands.length) {
      throw new BadRequestError('No matching brands found');
    }
    response.status(200).json(brands);
  } catch (error: any) {
    next(error);
  }
};

/** POST */
export const createBrand = async (request: Request, response: Response, next: NextFunction) => {
  const {name, image, link} = request.body.trim().toUpperCase();

  try {
    const existingBrand = await Brand.findOne({ name, image, link });
    if (existingBrand) {
      throw new BadRequestError('No matching brands found');
    }

    const brand = new Brand({ name, image, link});
    await brand.save();
    response.status(201).json(brand);
  } catch (error: any) {
    next(error);
  }
};

/** PATCH */
export const updatePartialBrand = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { id } = request.params;
    const name = request.body.name.trim().toUpperCase();

    const brand = await Brand.findById(id);

    if (!brand) {
      throw new NotFoundError(`Brand with id ${id} not found`);
    }

    if (name === brand.name.toUpperCase()) {
      throw new ConflictError(`New name is the same as current name`);
    }

    const existingBrand = await Brand.findOne({ name });

    if (existingBrand && existingBrand.id !== id) {
      throw new ConflictError(`Brand with name ${name} already exists`);
    }

    brand.name = name;

    const updatedBrand = await brand.save();

    response.status(200).json(updatedBrand);
  } catch (error: any) {
    next(error);
  }
};

/** PUT */
export const updateBrand = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { id } = request.params;
    const { name } = request.body;

    const updatedBrand = await Brand.findByIdAndUpdate(id, { name }, { new: true });

    if (!updatedBrand) {
      throw new NotFoundError(`Brand with id ${id} not found`);
    }

    response.status(200).json(updatedBrand);
  } catch (error: any) {
    next(error);
  }
};

/** DELETE */
export const deleteBrand = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { id } = request.params;
    const brand = await Brand.findById(id);

    if (!brand) {
      throw new BadRequestError(`Brand with id ${id} not found`);
    }

    await Brand.findByIdAndDelete(id);

    response.status(200).json({ message: `Brand deleted successfully` });
  } catch (error: any) {
    next(error);
  }
};
