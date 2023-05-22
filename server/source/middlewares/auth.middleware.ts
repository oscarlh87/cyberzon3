/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import { TokenData } from '..';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const SECRET_KEY = process.env.SECRET_KEY || 'CYBER-ZON3';
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token not proportionate' });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, SECRET_KEY);

    // Add user data to the object `request`
    req.body.user = decoded;
    req.tokenData = decoded as TokenData;

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Token inválido' });
  }
};

export function authorize(role: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    const SECRET_KEY = process.env.SECRET_KEY || 'CYBER-ZON3';

    if (!token) {
      return res.status(401).json({ message: 'No token was provided' });
    }

    try {
      const decodedToken: any = jwt.verify(token, SECRET_KEY);
      const userId = decodedToken.userId;


      const populatedUser: any = await User.findById(userId).populate('role');

      if (populatedUser.role.access.includes(role)) {
        // If the user has the necessary role to access the route, access is allowed
        req.body.user = populatedUser;
        return next();
      } else {
        // If the user does not have the necessary role to access the route
        return res.status(403).json({ message: 'You have no permissions to access this route' });
      }
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Invalid token' });
    }
  };
}
