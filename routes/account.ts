import { Router } from 'express';
import * as passport from 'passport';
import { verify, getAccount } from '../controllers';

export const accountRouter = Router();

accountRouter.get('/', passport.authenticate('jwt', { session: false }), getAccount);

accountRouter.get('/verify/:key', verify);