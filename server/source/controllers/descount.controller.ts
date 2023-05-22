import Descount from '../models/descount.model';
import { Request, Response } from 'express';

/** GET asociada por el metodo populate trae las categorias asociadas al producto*/
export const getDescount = async (request: Request, response: Response) => {
  try {
    const name = request.query.name;
    const query = name ? { name: { $regex: name, $options: 'i' } } : {};
    const Descounts = await Descount.find(query);
    response.status(200).json(Descounts);
  } catch (error: any) {
    response.status(500).json({ error: error.message });
  }
};

/** POST */
export const createDescount = async (request: Request, response: Response) => {
  const { name } = request.body;

  const descount = new Descount({ name });

  try {
    await descount.save();
    response.status(201).json(descount);
  } catch (error: any) {
    response.status(400).json({ error: error.message });
  }
};

/** PATCH */
export const updateDescount = async (request: Request, response: Response) => {
  try {
    const descount = await Descount.findByIdAndUpdate(request.params.id, request.body, { new: true });
    response.status(200).json(descount);
  } catch (error: any) {
    response.status(400).json({ error: error.message });
  }
};
/** PUT */
export const updatePartialDescount = async (request: Request, response: Response) => {
  try {
    const descount = await Descount.findByIdAndUpdate(request.params.id, request.body, { new: true });
    response.status(200).json(descount);
  } catch (error: any) {
    response.status(400).json({ error: error.message });
  }
};
/** DELETE */
export const deleteDescount = async (request: Request, response: Response) => {
  try {
    await Descount.findByIdAndDelete(request.params.id);
    response.status(200).json({ message: 'Descount deleted successfully' });
  } catch (error: any) {
    response.status(400).json({ error: error.message });
  }
};
