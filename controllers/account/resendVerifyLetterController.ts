import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import { UserModel, VerKeyModel, VerKeyInterface } from '../../models';
import { errorHandler, successHandler, mailSend } from '../../utils';

export const resendVerifyLetter = async (req: Request, res: Response): Promise<Response> => {
  const { email } = req.body;

  const hash = uuid();
  const baseUrl = process.env.FRONT_BASE_URL || 'http://localhost:3000';
  const path = baseUrl + `/verify/${hash}`;

  try {
    const userCandidate = await UserModel.findOne({ email });
    if (!userCandidate) {
      return errorHandler(res, 404, `No such user with email: ${email}`);
    }

    const verificationKeyCandidate = await VerKeyModel.findOne({
      userId: userCandidate._id,
    });
    if (!verificationKeyCandidate) {
      return errorHandler(res, 404, `No such verification key`);
    }
    if (await verificationKeyCandidate.verifiedAt) {
      return errorHandler(res, 401, `email ${email} is already verified`);
    }

    verificationKeyCandidate.remove();

    const verificationKeyData: VerKeyInterface = {
      userId: userCandidate._id,
      hash,
    };

    const verificationKey = await VerKeyModel.create(verificationKeyData);
    await verificationKey.save();

    const isMailSend = await mailSend(
      path,
      email,
      'Email confirmation',
      'Follow the link to verify your email: '
    );
    if (!isMailSend) {
      return errorHandler(res, 500, 'verification letter was not sent');
    }

    successHandler(res, 200, 'verification letter sent');
  } catch (e: unknown) {
    if (!(e instanceof Error)) throw e;

    return errorHandler(res, 500, e.message);
  }
};
