import { Router } from 'express';
import * as passport from 'passport';
import { getAllTotalScores, createTotalScore } from '../controllers';

export const totalScoreRouter = Router();

totalScoreRouter.get('/', passport.authenticate('jwt', { session: false }), getAllTotalScores);

totalScoreRouter.post('/', passport.authenticate('jwt', { session: false }), createTotalScore);
