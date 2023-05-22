import { Request, Response, NextFunction } from 'express';

import Graphic from '../models/graphic.model';

import { BadRequestError, ConflictError, NotFoundError } from '../helpers/customErrors';

/** GET */
export const getGraphic = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const name = request.query.name;
    let query = {};

    if (name) {
      const regex = new RegExp(`^${name}`, 'i');
      query = { name: regex };
    }

    const graphics = await Graphic.find(query);
    if (graphics.length === 0) {
      throw new BadRequestError('No matching graphics found');
    }
    response.status(200).json(graphics);
  } catch (error: any) {
    next(error);
  }
};

/** POST */
export const createGraphic = async (request: Request, response: Response, next: NextFunction) => {
  const name = request.body.name.trim().toUpperCase();

  try {
    const existingGraphic = await Graphic.findOne({ name });
    if (existingGraphic) {
      throw new BadRequestError('Graphic already exists');
    }

    const graphic = new Graphic({ name });
    await graphic.save();
    response.status(201).json(graphic);
  } catch (error: any) {
    next(error);
  }
};

/** PATCH */
export const updatePartialGraphic = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { id } = request.params;
    const name = request.body.name.trim().toUpperCase();

    const graphic = await Graphic.findById(id);

    if (!graphic) {
      throw new NotFoundError(`Graphic with id ${id} not found`);
    }

    if (name === graphic.name.toUpperCase()) {
      throw new ConflictError(`New name is the same as current name`);
    }

    const existingGraphic = await Graphic.findOne({ name });

    if (existingGraphic && existingGraphic.id !== id) {
      throw new ConflictError(`Graphic with name ${name} already exists`);
    }

    graphic.name = name;

    const updatedGraphic = await graphic.save();

    response.status(200).json(updatedGraphic);
  } catch (error: any) {
    next(error);
  }
};

/** PUT */
export const updateGraphic = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { id } = request.params;
    const name = request.body.name.trim().toUpperCase();

    const graphic = await Graphic.findById(id);

    if (!graphic) {
      throw new NotFoundError(`Graphic with id ${id} not found`);
    }

    if (name === graphic.name.toUpperCase()) {
      throw new ConflictError(`New name is the same as current name`);
    }

    const existingGraphic = await Graphic.findOne({ name });

    if (existingGraphic && existingGraphic.id !== id) {
      throw new ConflictError(`Graphic with name ${name} already exists`);
    }

    graphic.name = name;

    const updatedGraphic = await graphic.save();

    response.status(200).json(updatedGraphic);
  } catch (error: any) {
    next(error);
  }
};

/** DELETE */
export const deleteGraphic = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { id } = request.params;
    const graphic = await Graphic.findById(id);

    if (!graphic) {
      throw new BadRequestError(`Graphic with id ${id} not found`);
    }

    await Graphic.findByIdAndDelete(id);

    response.status(200).json({ message: 'Graphic deleted successfully.' });
  } catch (error: any) {
    next(error);
  }
};
