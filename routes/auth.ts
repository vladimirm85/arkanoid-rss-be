import { Router } from 'express';
import { login, register, loginGoogle } from '../controllers';
import * as passport from 'passport';

export const authRouter = Router();

const baseUrl = process.env.BASE_URL || 'http://localhost:3000'; // TODO `what front login link?

authRouter.post('/login', login);

authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

authRouter.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: `${baseUrl}/login`, session: false }),
  loginGoogle
);

authRouter.post('/register', register);
