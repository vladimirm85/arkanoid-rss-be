import { Response } from 'express';
import { UserDocumentInterface, SaveDocumentInterface } from '../models';

export const successHandler = (
  res: Response,
  code: number,
  document: UserDocumentInterface | SaveDocumentInterface | SaveDocumentInterface[] | string
): Response =>
  res.status(code).json({
    success: true,
    payload: document,
  });
