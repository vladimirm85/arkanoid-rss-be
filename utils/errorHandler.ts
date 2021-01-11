import { Response } from 'express';

export const errorHandler = (res: Response, errorCode: number, message: string = null): Response =>
  res.status(errorCode).json({
    success: false,
    message,
  });
