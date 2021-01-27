import { Router } from 'express';
import { login, register, loginGoogle, loginGithub, loginFacebook } from '../controllers';
import * as passport from 'passport';

export const authRouter = Router();

const baseUrl = process.env.FRONT_BASE_URL || 'http://localhost:3000';

authRouter.post('/login', login);

authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

authRouter.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: `${baseUrl}/game`, session: false }),
  loginGoogle
);

authRouter.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

authRouter.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: `${baseUrl}/game`, session: false }),
  loginGithub
);

authRouter.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

authRouter.get(
  '/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: `${baseUrl}/game`, session: false }),
  loginFacebook
);

authRouter.post('/register', register);
