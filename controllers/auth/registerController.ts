import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import { UserModel, UserInterface, VerKeyModel, VerKeyInterface } from '../../models';
import { userRegisterSchema, userValidation } from '../../validation';
import { errorHandler, successHandler, generateHash, mailSend } from '../../utils';

export const register = async (req: Request, res: Response): Promise<void | Response> => {
  const { email, password } = req.body;

  const userCandidate = await UserModel.findOne({ email });
  if (userCandidate) {
    return errorHandler(res, 409, `Sorry, email: ${email} has already been taken!`);
  }

  const isUserValid = userValidation(res, userRegisterSchema, req.body);
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

  const hashPassword = await generateHash(password);
  if (!hashPassword) {
    return errorHandler(res, 500, 'hashPassword was not generated');
  }

  const hash = uuid();

  const userData: UserInterface = {
    email,
    password,
    createdAt: new Date(),
  };

  const user = await UserModel.create(userData);

  const verificationKeyData: VerKeyInterface = {
    userId: user._id,
    hash: hash,
    verifiedAt: new Date(),
  };

  const verificationKey = await VerKeyModel.create(verificationKeyData);

  try {
    await user.save();
    await verificationKey.save();

    successHandler(res, 201, user);
  } catch (e: unknown) {
    if (!(e instanceof Error)) throw e;

    return errorHandler(res, 500, e.message);
  }

  const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

  const path = baseUrl + `/email-verification/${hash}`;

  const isMailSend = await mailSend(
    path,
    email,
    'Email confirmation',
    'Follow the link to verify your email: '
  );
  if (!isMailSend) {
    return errorHandler(res, 500, 'register: a verification letter was not sent');
  }
};
