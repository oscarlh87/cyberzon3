import { Request, Response, NextFunction } from 'express';

import Category from '../models/category.model';

import { BadRequestError, ConflictError, NotFoundError } from '../helpers/customErrors';

/** GET */
export const getCategory = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const name = request.query.name;
    let query = {};

    if (name) {
      const regex = new RegExp(`^${name}`, 'i');
      query = { name: regex };
    }

    const category = await Category.find(query);

    if (category.length === 0) {
      throw new BadRequestError('No matching categories found');
    }

    response.status(200).json(category);
  } catch (error: any) {
    next(error);
  }
};

/** POST */
export const createCategory = async (request: Request, response: Response, next: NextFunction) => {
  const name = request.body.name.trim().toUpperCase();

  try {
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      throw new BadRequestError('Category already exists');
    }

    const category = new Category({ name });
    await category.save();
    response.status(201).json(category);
  } catch (error: any) {
    next(error);
  }
};

/** PATCH */
export const updatePartialCategory = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { id } = request.params;
    const name = request.body.name.trim().toUpperCase();

    const category = await Category.findById(id);

    if (!category) {
      throw new NotFoundError(`Category with id ${id} not found`);
    }

    if (name === category.name.toUpperCase()) {
      throw new ConflictError(`New name is the same as current name`);
    }

    const existingCategory = await Category.findOne({ name });

    if (existingCategory && existingCategory.id !== id) {
      throw new ConflictError(`Category with name ${name} already exists`);
    }

    category.name = name;

    const updatedCategory = await category.save();

    response.status(200).json(updatedCategory);
  } catch (error: any) {
    next(error);
  }
};

/** PUT */
export const updateCategory = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { id } = request.params;
    const name = request.body.name.trim().toUpperCase();

    const category = await Category.findById(id);

    if (!category) {
      throw new NotFoundError(`Category with id ${id} not found`);
    }

    if (name === category.name.toUpperCase()) {
      throw new ConflictError(`New name is the same as current name`);
    }

    const existingCategory = await Category.findOne({ name });

    if (existingCategory && existingCategory.id !== id) {
      throw new ConflictError(`Category with name ${name} already exists`);
    }

    category.name = name;

    const updatedCategory = await category.save();

    response.status(200).json(updatedCategory);
  } catch (error: any) {
    next(error);
  }
};

/** DELETE */
export const deleteCategory = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { id } = request.params;
    const category = await Category.findById(id);

    if (!category) {
      throw new BadRequestError(`Category with id ${id} not found`);
    }

    await Category.findByIdAndDelete(id);

    response.status(200).json({ message: 'Category deleted successfully.' });
  } catch (error: any) {
    next(error);
  }
};
