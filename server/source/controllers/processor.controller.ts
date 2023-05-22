import { Request, Response, NextFunction } from 'express';

import Processor from '../models/processor.model';

import { BadRequestError, ConflictError, NotFoundError } from '../helpers/customErrors';

/** GET */
export const getProcessor = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const name = request.query.name;
    let query = {};
    if (name) {
      const regex = new RegExp(`^${name}`, 'i');
      query = { name: regex };
    }
    const processors = await Processor.find(query);
    if (processors.length === 0) {
      throw new BadRequestError('No matching processors found');
    }
    response.status(200).json(processors);
  } catch (error: any) {
    next(error);
  }
};

/** POST */
export const createProcessor = async (request: Request, response: Response, next: NextFunction) => {
  const name = request.body.name.trim();

  try {
    const existingProcessor = await Processor.findOne({ name });

    if (existingProcessor) {
      throw new BadRequestError('Processor already exists');
    }

    const processor = new Processor({ name });
    await processor.save();
    response.status(201).json(processor);
  } catch (error: any) {
    next(error);
  }
};

/** PATCH */
export const updatePartialProcessor = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { id } = request.params;
    const name = request.body.name.trim();

    const processor = await Processor.findById(id);

    if (!processor) {
      throw new NotFoundError(`Processor with id ${id} not found`);
    }

    if (name.toUpperCase() === processor.name.toUpperCase()) {
      throw new ConflictError(`New name is the same as current name`);
    }

    const existingProcessor = await Processor.findOne({ name });

    if (existingProcessor && existingProcessor.id !== id) {
      throw new ConflictError(`Processor with name ${name} already exists`);
    }

    processor.name = name;

    const updatedProcessor = await processor.save();

    response.status(200).json(updatedProcessor);
  } catch (error: any) {
    next(error);
  }
};

/** PUT */
export const updateProcessor = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { id } = request.params;
    const name = request.body.name.trim();

    const processor = await Processor.findById(id);

    if (!processor) {
      throw new NotFoundError(`Processor with id ${id} not found`);
    }

    if (name.toUpperCase() === processor.name.toUpperCase()) {
      throw new ConflictError(`New name is the same as current name`);
    }

    const existingProcessor = await Processor.findOne({ name });

    if (existingProcessor && existingProcessor.id !== id) {
      throw new ConflictError(`Processor with name ${name} already exists`);
    }

    processor.name = name;

    const updatedProcessor = await processor.save();

    response.status(200).json(updatedProcessor);
  } catch (error: any) {
    next(error);
  }
};

/** DELETE */
export const deleteProcessor = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { id } = request.params;
    const processor = await Processor.findById(id);

    if (!processor) {
      throw new BadRequestError(`Processor with id ${id} not found`);
    }

    await Processor.findByIdAndDelete(id);

    response.status(200).json({ message: 'Processor deleted successfully.' });
  } catch (error: any) {
    next(error);
  }
};
