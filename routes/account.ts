import { Router } from 'express';
import * as passport from 'passport';
import {
  verify,
  getAccount,
  forgotPassword,
  restorePassword,
  resendVerifyLetter,
  setAvatar,
} from '../controllers';

export const accountRouter = Router();

accountRouter.get('/', passport.authenticate('jwt', { session: false }), getAccount);

accountRouter.post('/verify/:key', verify);

accountRouter.post('/forgot-password/', forgotPassword);

accountRouter.post('/restore-password/:key', restorePassword);

accountRouter.post('/resend-verify/', resendVerifyLetter);

accountRouter.post('/set-avatar/', passport.authenticate('jwt', { session: false }), setAvatar);
