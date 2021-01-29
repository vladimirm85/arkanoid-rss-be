import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import { UserModel, UserInterface, VerKeyModel, VerKeyInterface } from '../../models';
import { userRegisterSchema, dataValidation } from '../../validation';
import { errorHandler, mailSend, successHandler } from '../../utils';

export const register = async (req: Request, res: Response): Promise<void | Response> => {
  const { email, password } = req.body;

  const hash = uuid();
  const baseUrl = process.env.FRONT_BASE_URL || 'http://localhost:3000';
  const path = baseUrl + `/verify/${hash}`;

  try {
    const userCandidate = await UserModel.findOne({ email });
    if (userCandidate) {
      return errorHandler(res, 409, `Sorry, email: ${email} has already been taken!`);
    }

    const isUserValid = dataValidation(res, userRegisterSchema, req.body);
    if (!isUserValid) {
      return;
    }

    const userData: UserInterface = {
      email,
      nickname: email.split('@')[0],
      password,
      totalScore: 0,
      createdAt: new Date(),
    };

    const user = await UserModel.create(userData);

    const verificationKeyData: VerKeyInterface = {
      userId: user._id,
      hash,
    };

    const verificationKey = await VerKeyModel.create(verificationKeyData);

    await user.save();
    await verificationKey.save();

    const isMailSend = await mailSend(
      path,
      email,
      'Email confirmation',
      'Follow the link to verify your email: '
    );
    if (!isMailSend) {
      return errorHandler(res, 500, 'register: a verification letter was not sent');
    }

    successHandler(res, 200, 'Email send');
  } catch (e: unknown) {
    if (!(e instanceof Error)) throw e;

    return errorHandler(res, 500, e.message);
  }
};
