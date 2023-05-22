import bcrypt from 'bcrypt';

import { Request, Response, NextFunction } from 'express';
const nodemailer = require('nodemailer');

import User from '../models/user.model';
import Role from '../models/role.model';

import { avatarRegex, emailRegex, nameRegex, passwordRegex } from '../utils/regExp';
import { BadRequestError, ConflictError, NotFoundError } from '../helpers/customErrors';

/** GET ALL USERS*/
export const getUsers = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const name = request.query.name;
    const query = name ? { name: { $regex: name, $options: 'i' } } : {};
    const users = await User.find(query).populate('role').lean();

    if (!users.length) {
      throw new BadRequestError(`No results found for ${name}.`);
    }

    const newUsers = users.map((user) => {
      const newUsers = { ...user };
      //delete newUsers.role._id;
      return newUsers;
    });

    response.status(200).json(newUsers);
  } catch (error: any) {
    next(error);
  }
};

/** GET USER INFO TOKEN*/
export const getUser = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const userId = request.body.user.userId;
    const user = await User.findById(userId).populate('role').lean();

    if (!user) {
      throw new NotFoundError(`User with ID ${userId} not found`);
    }

    const newUser = { ...user, role: user.role.name };
    delete newUser.role._id;

    response.status(200).json(newUser);
  } catch (error: any) {
    next(error);
  }
};

/** GET USER BY ID */
export const getUserByID = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const userId = request.params.id;
    const user = await User.findById(userId).populate('role').lean();

    if (!user) {
      throw new NotFoundError(`User with ID ${userId} not found`);
    }

    const newUser = { ...user, role: user.role.name };
    delete newUser.role._id;

    response.status(200).json(newUser);
  } catch (error: any) {
    next(error);
  }
};

/** POST */
export const createUser = async (request: Request, response: Response, next: NextFunction) => {
  const { username, email, password, name, lastName, avatar, role } = request.body;

  try {
    const usernames = await User.findOne({ username });

    if (usernames) {
      throw new ConflictError('Already username exists, enter another');
    }

    if (!emailRegex.test(email)) {
      throw new BadRequestError('Invalid email format');
    }

    if (!passwordRegex.test(password)) {
      throw new BadRequestError('Password format invalid');
    }

    if (!nameRegex.test(name)) {
      throw new BadRequestError('Enter a valid name');
    }

    if (!nameRegex.test(lastName)) {
      throw new BadRequestError('Enter a correct last name');
    }

    if (!avatarRegex.test(avatar)) {
      throw new BadRequestError('Invalid avatar format');
    }

    const roleField = await Role.findOne({ name: role });
    if (!roleField?.name === role) {
      throw new BadRequestError(`Role ${role} does not exist in the role list`);
    }

    const user = new User({ username, email, password, name, lastName, avatar, role: roleField?.id });
    await user.save();

    // Configurar el transporte de correo con Nodemailer
    const transporter = nodemailer.createTransport({
      host: 'mail.cyberzon3.com', // Por ejemplo, 'smtp.gmail.com'
      port: '465', // Por ejemplo, 465 para SSL o 587 para TLS
      secure: true, // Cambia a "false" si no usas SSL/TLS
      auth: {
        user: 'no-reply@cyberzon3.com', // Tu dirección de correo electrónico
        pass: 'CyberZon3-2023', // Tu contraseña de correo electrónico
      },
    });

    // Enviar el correo
    await transporter.sendMail({
      from: 'noreply@cyberzon3.com', // Dirección de correo remitente
      to: email, // Dirección de correo destinatario (en este caso, el usuario recién creado)
      subject: 'Bienvenido a Cyberzon3', // Asunto del correo
      text: `Hola ${name},\n\nBienvenido a Cyberzon3. Tu cuenta ha sido creada con éxito.`, // Contenido del correo en texto sin formato
      html: `<p>Hola ${name},</p><p>Bienvenido a Cyberzon3. Tu cuenta ha sido creada con éxito.</p>`, // Contenido del correo en formato HTML
    });

    response.status(200).json({ message: 'User created with success' });
  } catch (error: any) {
    next(error);
  }
};

/** PATCH */
export const updatePartialUser = async (request: Request, response: Response, next: NextFunction) => {
  const { id } = request.params;
  const { username, email, password, name, lastName, avatar, role, active } = request.body;

  try {
    if (!id) {
      throw new BadRequestError('User ID is missing');
    }

    const user = await User.findById(id);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    if (username) {
      const usernames = await User.findOne({ username });
      if (usernames && usernames._id.toString() !== user._id.toString()) {
        throw new ConflictError('Already username exists, enter another');
      }
      user.username = username;
    }

    if (email) {
      if (!emailRegex.test(email)) {
        throw new BadRequestError('Invalid email format');
      }
      const emails = await User.findOne({ email });
      if (emails && emails._id.toString() !== user._id.toString()) {
        throw new ConflictError('Already email exists, enter another');
      }
      user.email = email;
    }

    if (password) {
      if (!passwordRegex.test(password)) {
        throw new BadRequestError('Password format invalid');
      }
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      user.password = password;
    }

    if (name) {
      if (!nameRegex.test(name)) {
        throw new BadRequestError('Enter a valid name');
      }
      user.name = name;
    }

    if (lastName) {
      if (!nameRegex.test(lastName)) {
        throw new BadRequestError('Enter a correct last name');
      }
      user.lastName = lastName;
    }

    if (avatar) {
      if (!avatarRegex.test(avatar)) {
        throw new BadRequestError('Invalid avatar format');
      }
      user.avatar = avatar;
    }

    if (role) {
      const role_ = await Role.findOne({ name: role });
      if (!role_) {
        throw new NotFoundError(`Role ${role} does not exist in the role list`);
      }
      user.role = role_._id;
    }

    if (active !== undefined) {
      if (typeof active !== 'boolean') {
        throw new BadRequestError('Invalid active value. Must be true or false');
      }
      user.active = active;
    }

    await user.save();

    response.status(200).json({ message: 'Data were updated correctly', status: 'ok' });
  } catch (error: any) {
    next(error);
  }
};

export const changePassword = async (request: Request, response: Response, next: NextFunction) => {
  const id = request.body.user.userId;
  const { password, passwordant } = request.body;
  try {
    if (!id) {
      throw new BadRequestError('User ID is missing');
    }

    if (!password) {
      throw new BadRequestError('New password is missing');
    }

    const user = await User.findById(id);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    const isMatch = await bcrypt.compare(passwordant, user.password);

    if (!isMatch) {
      throw new BadRequestError('Incorrect password');
    }

    if (password) {
      if (!passwordRegex.test(password)) {
        throw new BadRequestError('Password format invalid');
      }
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      user.password = password;
    }

    await user.save();

    response.status(200).json({ message: 'Data were updated correctly', status: 'ok' });
  } catch (error: any) {
    next(error);
  }
};

/** PUT */
export const updateUser = async (request: Request, response: Response, next: NextFunction) => {
  const { id } = request.params;
  const { username, password, name, lastName, avatar } = request.body;

  try {
    const user = await User.findById(id);

    if (!user) {
      throw new NotFoundError(`User with ID ${id} not found`);
    }

    if (username) {
      const existingUser = await User.findOne({ username });

      if (existingUser && existingUser.id !== id) {
        throw new ConflictError(`Username ${username} already exists`);
      }

      user.username = username;
    }

    if (password) {
      if (!passwordRegex.test(password)) {
        throw new BadRequestError('Invalid password format');
      }

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      user.password = hash;
    }

    if (name) {
      if (!nameRegex.test(name)) {
        throw new BadRequestError('Invalid name format');
      }

      user.name = name;
    }

    if (lastName) {
      if (!nameRegex.test(lastName)) {
        throw new BadRequestError('Invalid last name format');
      }

      user.lastName = lastName;
    }

    if (avatar) {
      if (!avatarRegex.test(avatar)) {
        throw new BadRequestError('Invalid avatar format');
      }

      user.avatar = avatar;
    }

    await user.save();

    response.status(200).json({ message: 'Data were updated correctly' });
  } catch (error: any) {
    next(error);
  }
};

/** DELETE */
export const deleteUser = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { id } = request.params;

    const user = await User.findById(id);

    if (!user) {
      throw new NotFoundError(`User not found`);
    }

    await User.findByIdAndDelete(id);

    response.status(200).json({ message: 'User deleted successfully' });
  } catch (error: any) {
    next(error);
  }
};
