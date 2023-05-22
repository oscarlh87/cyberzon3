import { Request, Response, NextFunction } from 'express';

import {
  BadRequestError,
  UnauthorizedError,
  PaymentRequiredError,
  NotFoundError,
  ForbiddenError,
  ConflictError,
} from '../helpers/customErrors';

const errorHandler = (error: Error, request: Request, response: Response, next: NextFunction) => {
  console.error(error.stack);

  if (response.headersSent) {
    return next(error);
  }

  if (error instanceof BadRequestError) {
    return response.status(error.statusCode).json({ error: error.message });
  }

  if (error instanceof PaymentRequiredError) {
    return response.status(error.statusCode).json({ error: error.message });
  }

  if (error instanceof UnauthorizedError) {
    return response.status(error.statusCode).json({ error: error.message });
  }

  if (error instanceof ForbiddenError) {
    return response.status(error.statusCode).json({ error: error.message });
  }

  if (error instanceof NotFoundError) {
    return response.status(error.statusCode).json({ error: error.message });
  }

  if (error instanceof ConflictError) {
    return response.status(error.statusCode).json({ error: error.message });
  }

  return response.status(500).json({ error: 'Internal Server Error' });
};
export default errorHandler;
