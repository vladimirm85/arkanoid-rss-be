import { Request, Response } from 'express';
import { UserModel, RecoveryPasswordKeyModel } from '../../models';
import {
  errorHandler,
  successHandler,
  TokenUserData,
  generateHash,
  createToken,
} from '../../utils';
import { dataValidation, restorePasswordSchema } from '../../validation';
import { pick } from 'lodash';

export const restorePassword = async (req: Request, res: Response): Promise<Response> => {
  const { password } = req.body;
  const { key } = req.params;

  try {
    const recPassKeyCandidate = await RecoveryPasswordKeyModel.findOne({ hash: key });
    if (!recPassKeyCandidate) {
      return errorHandler(res, 404, `No such recovery password key`);
    }

    const userCandidate = await UserModel.findById(recPassKeyCandidate.userId);
    if (!userCandidate) {
      return errorHandler(res, 404, `No such user`);
    }

    const isPasswordValid = dataValidation(res, restorePasswordSchema, req.body);
    if (!isPasswordValid) {
      return;
    }

    const hashedPassword = await generateHash(password);

    const token = await createToken(pick(userCandidate, ['_id', 'email']) as TokenUserData);

    await userCandidate.updateOne({ password: hashedPassword });

    await recPassKeyCandidate.remove();

    return successHandler(res, 201, `Bearer ${token}`);
  } catch (e: unknown) {
    if (!(e instanceof Error)) throw e;

    return errorHandler(res, 500, e.message);
  }
};
