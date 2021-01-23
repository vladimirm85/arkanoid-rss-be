import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import {
  UserModel,
  RecoveryPasswordKeyModel,
  RecoveryPasswordKeyInterface,
  VerKeyModel,
} from '../../models';
import { errorHandler, successHandler, mailSend } from '../../utils';

export const resendVerifyLetter = async (req: Request, res: Response): Promise<Response> => {
  const { email } = req.body;

  const hash = uuid();
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
  const path = baseUrl + `/verify/${hash}`;

  try {
    const userCandidate = await UserModel.findOne({ email });
    if (!userCandidate) {
      return errorHandler(res, 404, `No such user with email: ${email}`);
    }

    const verificationKeyCandidate = await VerKeyModel.findOne({ userId: userCandidate._id });
    if (!verificationKeyCandidate) {
      return errorHandler(res, 404, `No such verification key`);
    }

    const recoveryPasswordKeyData: RecoveryPasswordKeyInterface = {
      userId: userCandidate._id,
      hash,
      createdAt: new Date(),
    };

    const recoveryPasswordKey = await RecoveryPasswordKeyModel.create(recoveryPasswordKeyData);

    await recoveryPasswordKey.save();

    successHandler(res, 201, 'recovery password key created');

    const isMailSend = await mailSend(
      path,
      email,
      'Password recovery',
      'Follow the link to recover your password: '
    );
    if (!isMailSend) {
      return errorHandler(res, 500, 'password recovery: password recovery letter was not sent');
    }
  } catch (e: unknown) {
    if (!(e instanceof Error)) throw e;

    return errorHandler(res, 500, e.message);
  }
};
