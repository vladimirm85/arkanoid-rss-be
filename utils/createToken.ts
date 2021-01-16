import * as jwt from 'jsonwebtoken';

export const createToken = (userData) =>
  jwt.sign(
    {
      email: userData.email,
      userId: userData._id,
    },
    process.env.JWT_KEY,
    { expiresIn: '24h' }
  );
