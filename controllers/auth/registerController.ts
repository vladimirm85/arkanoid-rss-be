import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import { UserModel, UserInterface, VerKeyModel, VerKeyInterface } from '../../models';
import { userRegisterSchema, dataValidation } from '../../validation';
import { errorHandler, successHandler, mailSend } from '../../utils';

export const register = async (req: Request, res: Response): Promise<void | Response> => {
  const { email, password } = req.body;

  const hash = uuid();
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
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

    const userValidateCandidate = userRegisterSchema.validate(req.body);
    if (userValidateCandidate.error) {
      return errorHandler(
        res,
        409,
        `${userValidateCandidate.error.details[0].path[0]} validation error`
      );
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

    successHandler(res, 201, user);

    const isMailSend = await mailSend(
      path,
      email,
      'Email confirmation',
      'Follow the link to verify your email: '
    );
    if (!isMailSend) {
      return errorHandler(res, 500, 'register: a verification letter was not sent');
    }
  } catch (e: unknown) {
    if (!(e instanceof Error)) throw e;

    return errorHandler(res, 500, e.message);
  }
};
