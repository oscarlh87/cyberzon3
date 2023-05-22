import { Request, Response, NextFunction } from 'express';

import Storage from '../models/storage.model';

import { BadRequestError, ConflictError, NotFoundError } from '../helpers/customErrors';

/** GET */
export const getStorage = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const name = request.query.name;
    let query = {};
    if (name) {
      const regex = new RegExp(`^${name}`, 'i');
      query = { name: regex };
    }
    const storages = await Storage.find(query);
    if (storages.length === 0) {
      throw new BadRequestError('No matching storages found');
    }
    response.status(200).json(storages);
  } catch (error: any) {
    next(error);
  }
};

/** POST */
export const createStorage = async (request: Request, response: Response, next: NextFunction) => {
  const name = request.body.name.trim().toUpperCase();

  try {
    const existingStorage = await Storage.findOne({ name });
    if (existingStorage) {
      throw new BadRequestError('Storage already exists');
    }

    const storage = new Storage({ name });
    await storage.save();
    response.status(201).json(storage);
  } catch (error: any) {
    next(error);
  }
};

/** PATCH */
export const updatePartialStorage = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { id } = request.params;
    const name = request.body.name.trim().toUpperCase();

    const storage = await Storage.findById(id);

    if (!storage) {
      throw new NotFoundError(`Storage with id ${id} not found`);
    }

    if (name === storage.name.toUpperCase()) {
      throw new ConflictError(`New name is the same as current name`);
    }

    const existingStorage = await Storage.findOne({ name });

    if (existingStorage && existingStorage.id !== id) {
      throw new ConflictError(`Storage with name ${name} already exists`);
    }

    storage.name = name;

    const updatedStorage = await storage.save();

    response.status(200).json(updatedStorage);
  } catch (error: any) {
    next(error);
  }
};

/** PUT */
export const updateStorage = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { id } = request.params;
    const name = request.body.name.trim().toUpperCase();

    const storage = await Storage.findById(id);

    if (!storage) {
      throw new NotFoundError(`Storage with id ${id} not found`);
    }

    if (name === storage.name.toUpperCase()) {
      throw new ConflictError(`New name is the same as current name`);
    }

    const existingStorage = await Storage.findOne({ name });

    if (existingStorage && existingStorage.id !== id) {
      throw new ConflictError(`Storage with name ${name} already exists`);
    }

    storage.name = name;

    const updatedStorage = await storage.save();

    response.status(200).json(updatedStorage);
  } catch (error: any) {
    next(error);
  }
};

/** DELETE */
export const deleteStorage = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { id } = request.params;
    const storage = await Storage.findById(id);

    if (!storage) {
      throw new BadRequestError(`Storage with id ${id} not found`);
    }

    await Storage.findByIdAndDelete(id);

    response.status(200).json({ message: 'Storage deleted successfully.' });
  } catch (error: any) {
    next(error);
  }
};
