import { Request, Response } from 'express';
import { pick } from 'lodash';
import { UserModel, VerKeyModel } from '../../models';
import { createToken, errorHandler, successHandler, TokenUserData } from '../../utils';

export const verify = async (req: Request, res: Response): Promise<Response> => {
  const { key } = req.params;

  const userVerificationKey = await VerKeyModel.findOne({ hash: key });

  if (!userVerificationKey) {
    return errorHandler(res, 404, `verification: verificationKey was not found in database`);
  }

  if (!userVerificationKey.verifiedAt) {
    try {
      await userVerificationKey.updateOne({ verifiedAt: new Date() });

      const userCandidate = await UserModel.findById(userVerificationKey.userId);

      const token = await createToken(pick(userCandidate, ['_id', 'email']) as TokenUserData);

      return successHandler(res, 201, `Bearer ${token}`);
    } catch (e: unknown) {
      if (!(e instanceof Error)) throw e;

      return errorHandler(res, 500, e.message);
    }
  }

  return errorHandler(res, 409, 'already verified');
};
