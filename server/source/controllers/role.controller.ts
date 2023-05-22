import { Request, Response, NextFunction } from 'express';

import Role from '../models/role.model';

import { BadRequestError, ConflictError, NotFoundError } from '../helpers/customErrors';

/** GET */
export const getRole = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const name = request.query.name;
    let query = {};
    if (name) {
      const regex = new RegExp(`^${name}`, 'i');
      query = { name: regex };
    }

    const roles = await Role.find(query);
    if (!roles.length) {
      throw new BadRequestError('No matching roles found');
    }

    response.status(200).json(roles);
  } catch (error: any) {
    next(error);
  }
};

/** PATCH */
export const updatePartialRole = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { id } = request.params;
    const name = request.body.name.trim();

    const role = await Role.findById(id);

    if (!role) {
      throw new NotFoundError(`Role with id ${id} not found`);
    }

    if (name.toUpperCase() === role.name.toUpperCase()) {
      throw new ConflictError(`New name is the same as current name`);
    }

    const existingRole = await Role.findOne({ name });

    if (existingRole && existingRole.id !== id) {
      throw new ConflictError(`Role with name ${name} already exists`);
    }

    role.name = name;

    const updatedRole = await role.save();

    response.status(200).json(updatedRole);
  } catch (error: any) {
    next(error);
  }
};

/** POST */
export const createRole = async (request: Request, response: Response, next: NextFunction) => {
  const name = request.body.name.trim();
  const { access } = request.body;

  try {
    const existingRole = await Role.findOne({ name });

    if (existingRole) {
      throw new ConflictError('Role already exists');
    }

    const role = new Role({ name, access });
    await role.save();
    response.status(201).json(role);
  } catch (error: any) {
    next(error);
  }
};

/** PUT */
export const updateRole = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { id } = request.params;
    const name = request.body.name.trim();

    const role = await Role.findById(id);

    if (!role) {
      throw new NotFoundError(`Role with id ${id} not found`);
    }

    if (name.toUpperCase() === role.name.toUpperCase()) {
      throw new ConflictError(`New name is the same as current name`);
    }

    const existingRole = await Role.findOne({ name });

    if (existingRole && existingRole.id !== id) {
      throw new ConflictError(`Role with name ${name} already exists`);
    }

    role.name = name;

    const updatedRole = await role.save();

    response.status(200).json(updatedRole);
  } catch (error: any) {
    next(error);
  }
};

/** DELETE */
export const deleteRole = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { id } = request.params;
    const role = await Role.findById(id);

    if (!role) {
      throw new NotFoundError(`Role with id ${id} not found`);
    }

    await Role.findByIdAndDelete(id);

    response.status(200).json({ message: 'Role deleted successfully.' });
  } catch (error: any) {
    next(error);
  }
};
