import * as jwt from 'jsonwebtoken';

export interface TokenUserData {
  email: string;
  _id: string;
}

export const createToken = (userData: TokenUserData) =>
  jwt.sign(
    {
      email: userData.email,
      userId: userData._id,
    },
    process.env.JWT_KEY,
    { expiresIn: '24h' }
  );
