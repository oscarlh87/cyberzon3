import { Request, Response, NextFunction } from 'express';

import Tax from '../models/tax.model';

import { BadRequestError, ConflictError, NotFoundError } from '../helpers/customErrors';

/** GET */
export const getTax = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const name = request.query.name;
    let query = {};
    if (name) {
      const regex = new RegExp(`^${name}`, 'i');
      query = { name: regex };
    }
    const brands = await Tax.find(query);
    if (!brands.length) {
      throw new BadRequestError('No matching Tax found');
    }
    response.status(200).json(brands);
  } catch (error: any) {
    next(error);
  }
};

/** POST */
export const createTax = async (request: Request, response: Response, next: NextFunction) => {
  const name = request.body.name.trim().toUpperCase();

  try {
    const existingTax = await Tax.findOne({ name });
    if (existingTax) {
      throw new BadRequestError('No matching tax found');
    }

    const tax = new Tax({ name });
    await tax.save();
    response.status(201).json(tax);
  } catch (error: any) {
    next(error);
  }
};

/** PATCH */
export const updatePartialTax = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { id } = request.params;
    const name = request.body.name.trim().toUpperCase();

    const tax = await Tax.findById(id);

    if (!tax) {
      throw new NotFoundError(`Tax with id ${id} not found`);
    }

    if (name === tax.name.toUpperCase()) {
      throw new ConflictError(`New name is the same as current name`);
    }

    const existingTax = await Tax.findOne({ name });

    if (existingTax && existingTax.id !== id) {
      throw new ConflictError(`Tax with name ${name} already exists`);
    }

    tax.name = name;

    const updatedTax = await tax.save();

    response.status(200).json(updatedTax);
  } catch (error: any) {
    next(error);
  }
};

/** PUT */
export const updateTax = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { id } = request.params;
    const { name } = request.body;

    const updatedTax = await Tax.findByIdAndUpdate(id, { name }, { new: true });

    if (!updatedTax) {
      throw new NotFoundError(`Tax with id ${id} not found`);
    }

    response.status(200).json(updatedTax);
  } catch (error: any) {
    next(error);
  }
};

/** DELETE */
export const deleteTax = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { id } = request.params;
    const tax = await Tax.findById(id);

    if (!tax) {
      throw new BadRequestError(`Tax with id ${id} not found`);
    }

    await Tax.findByIdAndDelete(id);

    response.status(200).json({ message: `Brand deleted successfully` });
  } catch (error: any) {
    next(error);
  }
};
