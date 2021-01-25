import { Request, Response } from 'express';
import { UserModel } from '../../models';
import { errorHandler, successHandler, TokenUserData } from '../../utils';

export const setAvatar = async (req: Request, res: Response): Promise<Response> => {
  const user = req.user as TokenUserData;
  const { avatar } = req.body;

  try {
    const userCandidate = await UserModel.findByIdAndUpdate(
      user._id,
      { avatar },
      { new: true, useFindAndModify: false }
    );
    if (!userCandidate) {
      return errorHandler(res, 404, `No such user`);
    }

    return successHandler(res, 201, userCandidate);
  } catch (e: unknown) {
    if (!(e instanceof Error)) throw e;

    return errorHandler(res, 500, e.message);
  }
};
