import { Request, Response, NextFunction } from 'express';

import Keyboard from '../models/keyboard.model';

import { BadRequestError, ConflictError, NotFoundError } from '../helpers/customErrors';

/** GET associated with the populate method brings the categories associated with the product*/
export const getKeyboard = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const name = request.query.name;
    let query = {};
    if (name) {
      const regex = new RegExp(`^${name}`, 'i');
      query = { name: regex };
    }
    const keyboards = await Keyboard.find(query);
    if (keyboards.length === 0) {
      throw new BadRequestError('No matching keyboards found');
    }
    response.status(200).json(keyboards);
  } catch (error: any) {
    next(error);
  }
};

/** POST */
export const createKeyboard = async (request: Request, response: Response, next: NextFunction) => {
  const name = request.body.name.trim().toUpperCase();

  try {
    const existingKeyboard = await Keyboard.findOne({ name });
    if (existingKeyboard) {
      throw new BadRequestError('Keyboard already exists');
    }

    const keyboard = new Keyboard({ name });
    await keyboard.save();
    response.status(201).json(keyboard);
  } catch (error: any) {
    next(error);
  }
};

/** PATCH */
export const updatePartialKeyboard = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { id } = request.params;
    const name = request.body.name.trim().toUpperCase();

    const keyboard = await Keyboard.findById(id);

    if (!keyboard) {
      throw new NotFoundError(`Keyboard with id ${id} not found`);
    }

    if (name === keyboard.name.toUpperCase()) {
      throw new ConflictError(`New name is the same as current name`);
    }

    const existingKeyboard = await Keyboard.findOne({ name });

    if (existingKeyboard && existingKeyboard.id !== id) {
      throw new ConflictError(`Keyboard with name ${name} already exists`);
    }

    keyboard.name = name;

    const updatedKeyboard = await keyboard.save();

    response.status(200).json(updatedKeyboard);
  } catch (error: any) {
    next(error);
  }
};

/** PUT */
export const updateKeyboard = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { id } = request.params;
    const name = request.body.name.trim().toUpperCase();

    const keyboard = await Keyboard.findById(id);

    if (!keyboard) {
      throw new NotFoundError(`Keyboard with id ${id} not found`);
    }

    if (name === keyboard.name.toUpperCase()) {
      throw new ConflictError(`New name is the same as current name`);
    }

    const existingKeyboard = await Keyboard.findOne({ name });

    if (existingKeyboard && existingKeyboard.id !== id) {
      throw new ConflictError(`Keyboard with name ${name} already exists`);
    }

    keyboard.name = name;

    const updatedKeyboard = await keyboard.save();

    response.status(200).json(updatedKeyboard);
  } catch (error: any) {
    next(error);
  }
};

/** DELETE */
export const deleteKeyboard = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { id } = request.params;
    const keyboard = await Keyboard.findById(id);

    if (!keyboard) {
      throw new BadRequestError(`Keyboard with id ${id} not found`);
    }

    await Keyboard.findByIdAndDelete(id);

    response.status(200).json({ message: 'Keyboard deleted successfully.' });
  } catch (error: any) {
    next(error);
  }
};
