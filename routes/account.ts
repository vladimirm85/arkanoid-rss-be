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
import { upload } from '../middlewares';

export const accountRouter = Router();

accountRouter.get('/', passport.authenticate('jwt', { session: false }), getAccount);

accountRouter.post('/verify/:key', verify);

accountRouter.post('/forgot-password/', forgotPassword);

accountRouter.post('/restore-password/:key', restorePassword);

accountRouter.post('/resend-verify/', resendVerifyLetter);

accountRouter.post(
  '/set-avatar/',
  passport.authenticate('jwt', { session: false }),
  upload.single('image'),
  setAvatar
);
