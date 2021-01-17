import { Request, Response } from 'express';
import { pick } from 'lodash';
import * as bcryptjs from 'bcryptjs';
import { UserModel, VerKeyModel } from '../../models';
import { userLoginSchema, userValidation } from '../../validation';
import { errorHandler, successHandler, createToken, TokenUserData } from '../../utils';

export const login = async (req: Request, res: Response): Promise<void | Response> => {
  const { email, password } = req.body;

  const isUserValid = userValidation(res, userLoginSchema, req.body);
  if (!isUserValid) {
    return;
  }

  const userCandidate = await UserModel.findOne({ email });
  if (!userCandidate) {
    return errorHandler(res, 401, `No such user with email: ${email}`);
  }

  const verificationKey = await VerKeyModel.findOne({ userId: userCandidate.id });
  if (!(await verificationKey.verifiedAt)) {
    return errorHandler(res, 401, `email ${email} is not verified`);
  }

  const isPassMatch = await bcryptjs.compare(password, userCandidate.password);
  if (!isPassMatch) {
    return errorHandler(res, 422, 'Email or password is incorrect');
  }

  const token = await createToken(pick(userCandidate, ['_id', 'email']) as TokenUserData);
  if (!token) {
    errorHandler(res, 500, 'login: token was not created');
  }

  return successHandler(res, 201, `Bearer ${token}`);
};
