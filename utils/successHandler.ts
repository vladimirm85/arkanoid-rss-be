import { Response } from 'express';
import { UserDocument } from '../models';

export const successHandler = (
  res: Response,
  errorCode: number,
  document: UserDocument
): Response =>
  res.status(errorCode).json({
    success: true,
    payload: document,
  });
