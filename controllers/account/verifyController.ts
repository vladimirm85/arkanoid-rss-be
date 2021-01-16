import { Request, Response } from 'express';
import { VerKeyModel } from '../../models';
import { errorHandler, successHandler } from '../../utils';

export const verify = async (req: Request, res: Response): Promise<Response> => {
  const { verificationKey } = req.body;

  const userVerificationKey = await VerKeyModel.findOne({ hash: verificationKey });

  if (!userVerificationKey) {
    return errorHandler(res, 500, `verification: verificationKey was not found in database`);
  }

  try {
    await userVerificationKey.updateOne({ verifiedAt: new Date() });

    return successHandler(res, 200, 'verification successful');
  } catch (e: unknown) {
    if (!(e instanceof Error)) throw e;

    return errorHandler(res, 500, e.message);
  }
};
