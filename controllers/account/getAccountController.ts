import { Request, Response } from 'express';
import { UserModel } from '../../models';
import { errorHandler, successHandler, TokenUserData } from '../../utils';

export const getAccount = async (req: Request, res: Response): Promise<Response> => {
  const user = req.user as TokenUserData;

  const userCandidate = await UserModel.findById(user._id);
  if (!userCandidate) {
    return errorHandler(res, 401, 'Access denied');
  }

  return successHandler(res, 200, userCandidate);
};
