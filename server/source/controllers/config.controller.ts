import { Request, Response, NextFunction } from 'express';

import Config from '../models/config.model';

import { BadRequestError, ConflictError, NotFoundError } from '../helpers/customErrors';

/** GET */
export const getConfig = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const config = await Config.findOne();
    if (!config) {
      throw new BadRequestError('No Config found');
    }
    response.status(200).json(config);
  } catch (error: any) {
    next(error);
  }
};

/** POST */
export const createConfig = async (request: Request, response: Response, next: NextFunction) => {
  const name = request.body.name.trim().toUpperCase();

  try {
    const existingConfig = await Config.findOne({ name });
    if (existingConfig) {
      throw new BadRequestError('No matching Config found');
    }

    const config = new Config({ name });
    await config.save();
    response.status(201).json(config);
  } catch (error: any) {
    next(error);
  }
};

/** PATCH */
export const updatePartialConfig = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { id } = request.params;
    const { showSlider } = request.body;

    const config = await Config.findById(id);

    if (!config) {
      throw new NotFoundError(`Config with id ${id} not found`);
    }

    if (showSlider === undefined || showSlider === null) {
      throw new BadRequestError(`Missing showSlider value in request body`);
    }

    config.showSlider = showSlider;

    const updatedConfig = await config.save();

    response.status(200).json(updatedConfig);
  } catch (error: any) {
    next(error);
  }
};

/** PUT */
export const updateConfig = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { showSlider } = request.body;
    const config = await Config.findOne();
    if (!config) {
      throw new NotFoundError('Config not found');
    }
    config.showSlider = showSlider;
    const updatedConfig = await config.save();
    response.status(200).json({ _id: config._id, showSlider: updatedConfig.showSlider });
  } catch (error: any) {
    next(error);
  }
};

/** DELETE */
export const deleteConfig = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { id } = request.params;
    const config = await Config.findById(id);

    if (!config) {
      throw new BadRequestError(`Config with id ${id} not found`);
    }

    await Config.findByIdAndDelete(id);

    response.status(200).json({ message: `Config deleted successfully` });
  } catch (error: any) {
    next(error);
  }
};
