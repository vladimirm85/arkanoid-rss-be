import { Request, Response } from 'express';
import { UserModel, User } from '../models';

export const login = async () => {};
export const register = async (req: Request, res: Response): Promise<void | Response> => {
  const { email, password } = req.body;

  const userCandidate = await UserModel.findOne({ email });
  if (userCandidate) {
    return res.status(409).json({ message: `Sorry, email: ${email} has already been taken!` });
  }

  const userData: User = {
    email,
    password,
    createdAt: new Date(),
  };

  const user = await UserModel.create(userData);

  await user.save();
  res.status(201).json(user);
};
