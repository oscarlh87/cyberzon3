import { Request, Response, NextFunction } from 'express';

import Newletter from '../models/newletter.model';

import { BadRequestError, ConflictError, NotFoundError } from '../helpers/customErrors';

const nodemailer = require('nodemailer');

/** GET */
export const getNewletter = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const emails = await Newletter.find({}, 'email');
    if (!emails.length) {
      return response.status(404).json({ message: 'No se encontraron correos electrónicos registrados' });
    }
    response.status(200).json(emails);
  } catch (error: any) {
    next(error);
  }
};

/** POST */
export const createNewletter = async (request: Request, response: Response, next: NextFunction) => {
  const { email } = request.body;

  try {
    const existingNewletter = await Newletter.findOne({ email });
    if (existingNewletter) {
      throw new Error('El boletín ya existe');
    }

    const newletter = new Newletter({ email });
    await newletter.save();

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

    // Enviar el correo de confirmación
    await transporter.sendMail({
      from: 'noreply@cyberzon3.com', // Dirección de correo remitente
      to: email, // Dirección de correo destinatario (en este caso, el correo registrado)
      subject: 'Gracias por suscribirte a nuestro boletín', // Asunto del correo
      text: `Hola,\n\nGracias por suscribirte a nuestro boletín.`, // Contenido del correo en texto sin formato
      html: `<p>Hola,</p><p>Gracias por suscribirte a nuestro boletín.</p>`, // Contenido del correo en formato HTML
    });

    response.status(201).json(newletter);
  } catch (error: any) {
    next(error);
  }
};

/** PATCH */
export const updatePartialNewletter = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { id } = request.params;
    const email = request.body.email.trim().toUpperCase();

    const newl = await Newletter.findById(id);

    if (!newl) {
      throw new NotFoundError(`Newletter with id ${id} not found`);
    }

    if (email === email.email.toUpperCase()) {
      throw new ConflictError(`New Newletter is the same as current name`);
    }

    const existingNewletter = await Newletter.findOne({ email });

    if (existingNewletter && existingNewletter.id !== id) {
      throw new ConflictError(`Memory with name ${email} already exists`);
    }

    email.email = email;

    const updatedMemory = await email.save();

    response.status(200).json(updatedMemory);
  } catch (error: any) {
    next(error);
  }
};

/** PUT */
export const updateNewletter = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { id } = request.params;
    const email = request.body.email.trim().toUpperCase();

    const newl = await Newletter.findById(id);

    if (!newl) {
      throw new NotFoundError(`Newletter with id ${id} not found`);
    }

    if (email === email.email.toUpperCase()) {
      throw new ConflictError(`New Newletter is the same as current name`);
    }

    const existingNewletter = await Newletter.findOne({ email });

    if (existingNewletter && existingNewletter.id !== id) {
      throw new ConflictError(`Memory with name ${email} already exists`);
    }

    email.email = email;

    const updatedNewletter = await email.save();

    response.status(200).json(updatedNewletter);
  } catch (error: any) {
    next(error);
  }
};

/** DELETE */
export const deleteNewletter = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { id } = request.params;
    const newl = await Newletter.findById(id);

    if (!newl) {
      throw new BadRequestError(`Newletter with id ${id} not found`);
    }

    await Newletter.findByIdAndDelete(id);

    response.status(200).json({ message: 'Memory deleted successfully.' });
  } catch (error: any) {
    next(error);
  }
};
