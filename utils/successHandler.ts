import { Response } from 'express';
import { UserDocumentInterface } from '../models';

export const successHandler = (
  res: Response,
  errorCode: number,
  document: UserDocumentInterface
): Response =>
  res.status(errorCode).json({
    success: true,
    payload: document,
  });
