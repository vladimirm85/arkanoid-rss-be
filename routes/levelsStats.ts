import { Router } from 'express';
import * as passport from 'passport';
import { getAllLevelsStats, createLevelStat } from '../controllers';

export const levelsStatsRouter = Router();

levelsStatsRouter.get('/', passport.authenticate('jwt', { session: false }), getAllLevelsStats);

levelsStatsRouter.post('/', passport.authenticate('jwt', { session: false }), createLevelStat);
