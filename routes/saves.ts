import { Router } from 'express';
import { getAllSaves, getSaveById, createSave, updateSave, deleteSave } from '../controllers';

export const savesRouter = Router();

savesRouter.get('/', getAllSaves);

savesRouter.get('/:id', getSaveById);

savesRouter.post('/', createSave);

savesRouter.put('/:id', updateSave);

savesRouter.delete('/:id', deleteSave);
