import { Response } from 'express';
import { UserDocumentInterface } from '../models';

export const successHandler = (
  res: Response,
  code: number,
  document: UserDocumentInterface | string
): Response =>
  res.status(code).json({
    success: true,
    payload: document,
  });
