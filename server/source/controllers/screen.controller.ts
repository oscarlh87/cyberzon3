import { Request, Response, NextFunction } from 'express';

import Screen from '../models/screen.model';

import { BadRequestError, ConflictError, NotFoundError } from '../helpers/customErrors';

/** GET */
export const getScreen = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const name = request.query.name;
    let query = {};
    if (name) {
      const regex = new RegExp(`^${name}`, 'i');
      query = { name: regex };
    }
    const screen = await Screen.find(query);
    if (screen.length === 0) {
      throw new BadRequestError('No matching screens found');
    }
    response.status(200).json(screen);
  } catch (error: any) {
    next(error);
  }
};

/** POST */
export const createScreen = async (request: Request, response: Response, next: NextFunction) => {
  const name = request.body.name.trim();

  try {
    const existingScreen = await Screen.findOne({ name });

    if (existingScreen) {
      throw new BadRequestError('No matching screens found');
    }

    const screen = new Screen({ name });
    await screen.save();
    response.status(201).json(screen);
  } catch (error: any) {
    next(error);
  }
};

/** PATCH */
export const updatePartialScreen = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { id } = request.params;
    const name = request.body.name.trim();

    const screen = await Screen.findById(id);

    if (!screen) {
      throw new NotFoundError(`Screen with id ${id} not found`);
    }

    if (name.toUpperCase() === screen.name.toUpperCase()) {
      throw new ConflictError(`New name is the same as current name`);
    }

    const existingScreen = await Screen.findOne({ name });

    if (existingScreen && existingScreen.id !== id) {
      throw new ConflictError(`Screen with name ${name} already exists`);
    }

    screen.name = name;

    const updatedScreen = await screen.save();

    response.status(200).json(updatedScreen);
  } catch (error: any) {
    next(error);
  }
};

/** PUT */
export const updateScreen = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { id } = request.params;
    const name = request.body.name.trim();

    const screen = await Screen.findById(id);

    if (!screen) {
      throw new NotFoundError(`Screen with id ${id} not found`);
    }

    if (name.toUpperCase() === screen.name.toUpperCase()) {
      throw new ConflictError(`New name is the same as current name`);
    }

    const existingScreen = await Screen.findOne({ name });

    if (existingScreen && existingScreen.id !== id) {
      throw new ConflictError(`Screen with name ${name} already exists`);
    }

    screen.name = name;

    const updatedScreen = await screen.save();

    response.status(200).json(updatedScreen);
  } catch (error: any) {
    next(error);
  }
};

/** DELETE */
export const deleteScreen = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { id } = request.params;
    const screen = await Screen.findById(id);

    if (!screen) {
      throw new BadRequestError(`Screen with id ${id} not found`);
    }

    await Screen.findByIdAndDelete(id);

    response.status(200).json({ message: 'Screen deleted successfully.' });
  } catch (error: any) {
    next(error);
  }
};
