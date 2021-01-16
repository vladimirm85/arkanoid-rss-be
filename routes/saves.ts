import { Router } from 'express';
import * as passport from 'passport';
import { getAllSaves, getSaveById, createSave, updateSave, deleteSave } from '../controllers';

export const savesRouter = Router();

savesRouter.get('/', passport.authenticate('jwt', { session: false }), getAllSaves);

savesRouter.get('/:id', passport.authenticate('jwt', { session: false }), getSaveById);

savesRouter.post('/', passport.authenticate('jwt', { session: false }), createSave);

savesRouter.put('/:id', passport.authenticate('jwt', { session: false }), updateSave);

savesRouter.delete('/:id', passport.authenticate('jwt', { session: false }), deleteSave);
