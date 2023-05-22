import { Request, Response, NextFunction } from 'express';

import Slider from '../models/slider.model';

import { BadRequestError, ConflictError, NotFoundError } from '../helpers/customErrors';

/** GET */
export const getSlider = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const name = request.query.name;
    let query = {};
    if (name) {
      const regex = new RegExp(`^${name}`, 'i');
      query = { name: regex };
    }
    const Sliders = await Slider.find(query);
    if (Slider.length === 0) {
      throw new BadRequestError('No matching Sliders found');
    }
    response.status(200).json(Sliders);
  } catch (error: any) {
    next(error);
  }
};

/** POST */
export const createSlider = async (request: Request, response: Response, next: NextFunction) => {
    const {name, image} = request.body
  
    try {
      const existingSlider = await Slider.findOne({ name, image });
  
      if (existingSlider) {
        throw new Error('Slider already exists');
      }
  
      const slider = new Slider({ 
        name, 
        image });
        
      await slider.save();
      response.status(201).json(slider);
    } catch (error: any) {
      response.status(400).json({ error: error.message });
    }
  };

/** PUT */
export const updateSlider = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { id } = request.params;
    const name = request.body.name.trim().toUpperCase();
    const slider = await Slider.findById(id);
    if (!slider) {
      throw new NotFoundError(`Slider with id ${id} not found`); }
    if (name === slider.name.toUpperCase()) {
      throw new ConflictError(`New Slider is the same as current Slider`);
    }
    const existingSlider = await Slider.findOne({ name });

    if (existingSlider && existingSlider.id !== id) {
            throw new ConflictError(`Slider with name ${name} already exists`); }
           slider.name = name;
    const updatedSlider = await slider.save();
    response.status(200).json(updatedSlider);
  } catch (error: any) {
    next(error);
  }
};

/** PATCH */
export const updatePartialSlider = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { id } = request.params;
    const name = request.body.name.trim().toUpperCase();

    const slider = await Slider.findById(id);

    if (!slider) {
      throw new NotFoundError(`Slider with id ${id} not found`);
    }

    if (name === slider.name.toUpperCase()) {
      throw new ConflictError(`New name is the same as current name`);
    }

    const existingSlider = await Slider.findOne({ name });

    if (existingSlider && existingSlider.id !== id) {
      throw new ConflictError(`Slider with name ${name} already exists`);
    }

    slider.name = name;

    const updatedSlider = await slider.save();

    response.status(200).json(updatedSlider);
  } catch (error: any) {
    next(error);
  }
};

/** DELETE */
export const deleteSlider = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { id } = request.params;
    const slider = await Slider.findById(id);

    if (!slider) {
      throw new BadRequestError(`Slider with id ${id} not found`);
    }

    await Slider.findByIdAndDelete(id);

    response.status(200).json({ message: `Slider deleted successfully` });
  } catch (error: any) {
    next(error);
  }
};
