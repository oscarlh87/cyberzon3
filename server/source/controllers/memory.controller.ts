import { Request, Response, NextFunction } from 'express';

import Memory from '../models/memory.model';

import { BadRequestError, ConflictError, NotFoundError } from '../helpers/customErrors';

/** GET */
export const getMemory = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const name = request.query.name;
    let query = {};
    if (name) {
      const regex = new RegExp(`^${name}`, 'i');
      query = { name: regex };
    }
    const memory = await Memory.find(query);
    if (memory.length === 0) {
      throw new BadRequestError('No matching memories found');
    }
    response.status(200).json(memory);
  } catch (error: any) {
    next(error);
  }
};

/** POST */
export const createMemory = async (request: Request, response: Response, next: NextFunction) => {
  const name = request.body.name.trim().toUpperCase();

  try {
    const existingMemory = await Memory.findOne({ name });
    if (existingMemory) {
      throw new BadRequestError('Memory already exists');
    }

    const memory = new Memory({ name });
    await memory.save();
    response.status(201).json(memory);
  } catch (error: any) {
    next(error);
  }
};

/** PATCH */
export const updatePartialMemory = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { id } = request.params;
    const name = request.body.name.trim().toUpperCase();

    const memory = await Memory.findById(id);

    if (!memory) {
      throw new NotFoundError(`Memory with id ${id} not found`);
    }

    if (name === memory.name.toUpperCase()) {
      throw new ConflictError(`New name is the same as current name`);
    }

    const existingMemory = await Memory.findOne({ name });

    if (existingMemory && existingMemory.id !== id) {
      throw new ConflictError(`Memory with name ${name} already exists`);
    }

    memory.name = name;

    const updatedMemory = await memory.save();

    response.status(200).json(updatedMemory);
  } catch (error: any) {
    next(error);
  }
};

/** PUT */
export const updateMemory = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { id } = request.params;
    const name = request.body.name.trim().toUpperCase();

    const memory = await Memory.findById(id);

    if (!memory) {
      throw new NotFoundError(`Memory with id ${id} not found`);
    }

    if (name === memory.name.toUpperCase()) {
      throw new ConflictError(`New name is the same as current name`);
    }

    const existingMemory = await Memory.findOne({ name });

    if (existingMemory && existingMemory.id !== id) {
      throw new ConflictError(`Memory with name ${name} already exists`);
    }

    memory.name = name;

    const updatedMemory = await memory.save();

    response.status(200).json(updatedMemory);
  } catch (error: any) {
    next(error);
  }
};

/** DELETE */
export const deleteMemory = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { id } = request.params;
    const memory = await Memory.findById(id);

    if (!memory) {
      throw new BadRequestError(`Memory with id ${id} not found`);
    }

    await Memory.findByIdAndDelete(id);

    response.status(200).json({ message: 'Memory deleted successfully.' });
  } catch (error: any) {
    next(error);
  }
};
