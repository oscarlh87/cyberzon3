import { Request, Response, NextFunction } from 'express';

import Software from '../models/software.model';

import { BadRequestError, ConflictError, NotFoundError } from '../helpers/customErrors';

/** GET */
export const getSoftware = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const name = request.query.name;
    let query = {};
    if (name) {
      const regex = new RegExp(`^${name}`, 'i');
      query = { name: regex };
    }
    const softwares = await Software.find(query);
    if (softwares.length === 0) {
      throw new BadRequestError('No matching softwares found');
    }
    response.status(200).json(softwares);
  } catch (error: any) {
    next(error);
  }
};

/** POST */
export const createSoftware = async (request: Request, response: Response, next: NextFunction) => {
  const name = request.body.name.trim();

  try {
    const existingSoftware = await Software.findOne({ name });

    if (existingSoftware) {
      throw new BadRequestError('Software already exists');
    }

    const software = new Software({ name });
    await software.save();
    response.status(201).json(software);
  } catch (error: any) {
    next(error);
  }
};

/** PATCH */
export const updatePartialSoftware = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { id } = request.params;
    const name = request.body.name.trim();

    const software = await Software.findById(id);

    if (!software) {
      throw new NotFoundError(`Software with id ${id} not found`);
    }

    if (name.toUpperCase() === software.name.toUpperCase()) {
      throw new ConflictError(`New name is the same as current name`);
    }

    const existingSoftware = await Software.findOne({ name });

    if (existingSoftware && existingSoftware.id !== id) {
      throw new ConflictError(`Software with name ${name} already exists`);
    }

    software.name = name;

    const updatedSoftware = await software.save();

    response.status(200).json(updatedSoftware);
  } catch (error: any) {
    next(error);
  }
};

/** PUT */
export const updateSoftware = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { id } = request.params;
    const name = request.body.name.trim();

    const software = await Software.findById(id);

    if (!software) {
      throw new NotFoundError(`Software with id ${id} not found`);
    }

    if (name.toUpperCase() === software.name.toUpperCase()) {
      throw new ConflictError(`New name is the same as current name`);
    }

    const existingSoftware = await Software.findOne({ name });

    if (existingSoftware && existingSoftware.id !== id) {
      throw new ConflictError(`Software with name ${name} already exists`);
    }

    software.name = name;

    const updatedSoftware = await software.save();

    response.status(200).json(updatedSoftware);
  } catch (error: any) {
    next(error);
  }
};

/** DELETE */
export const deleteSoftware = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { id } = request.params;
    const software = await Software.findById(id);

    if (!software) {
      throw new BadRequestError(`Software with id ${id} not found`);
    }

    await Software.findByIdAndDelete(id);

    response.status(200).json({ message: 'Software deleted successfully.' });
  } catch (error: any) {
    next(error);
  }
};
