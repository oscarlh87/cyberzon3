import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import Role from '../models/role.model';

import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model';

import { UnauthorizedError } from '../helpers/customErrors';
import { OAuth2Client } from 'google-auth-library';
import { token } from 'morgan';
import { getUsers } from './users.controller';

export const authLogin = async (request: Request, response: Response, next: NextFunction) => {
  const { email, password } = request.body;
  const SECRET_KEY = process.env.SECRET_KEY || 'CYBER-ZON3';
  try {
    const user = await User.findOne({ email }).populate('role', 'name');

    if (!user) {
      throw new UnauthorizedError('user not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedError('Incorrect password');
    }

    // Generates a token jwt with the user ID
    const token = jwt.sign({ userId: user._id, role: user.role?.name }, SECRET_KEY, { expiresIn: '200h' });

    response.json({
      message: 'Login was successful',
      user: {
        firstName: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role._id,
      },
      token: token,
    });
  } catch (error) {
    next(error);
  }
};

export const getGoogleOauthToken = async (request: Request, response: Response) => {
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  const SECRET_KEY = process.env.SECRET_KEY || 'CYBER-ZON3';
  const { code } = request.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: code,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    const email = payload?.email; // obtener el correo electrónico del usuario desde el objeto payload
    let user = await User.findOne({ email });
    // console.log(payload);

    if (!user) {
      const roleField = await Role.findOne({ name: 'user' });

      user = new User({
        email: payload?.email,
        username: payload?.email?.split('@')[0],
        name: payload?.given_name,
        lastName: payload?.family_name,
        avatar: payload?.picture,
        password: 'xd',
        role: roleField?.id,
        // otros campos del modelo de usuario
      });
      await user.save();
    }
    const token = jwt.sign({ userId: user._id, role: user.role?.name }, SECRET_KEY, { expiresIn: '8h' });

    response.status(200).json({
      message: 'Login was successful',
      user: {
        firstName: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
      },
      token: token,
    });
  } catch (err: any) {
    console.log(err, 'Failed to fetch Google Oauth Tokens');
    response.status(500).json({ message: err.message });
  }
};
