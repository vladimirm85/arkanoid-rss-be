import { Router } from 'express';
import * as passport from 'passport';
import { getAllSaves, getSaveById, createSave, updateSave, deleteSave } from '../controllers';

export const savesRouter = Router();

/**
 * @swagger
 * definitions:
 *   Save:
 *     type: object
 *     properties:
 *       _id:
 *         type: string
 *       saveData:
 *         type: object
 *       userId:
 *         type: integer
 *       createdAt:
 *         type: string
 *         format: date # or date-time
 */

/**
 * @swagger
 * /saves:
 *   get:
 *     tags:
 *       - Saves
 *     description: Returns all saves
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array saves
 *         schema:
 *           $ref: '#/definitions/Save'
 *       500:
 *         description: error
 */
savesRouter.get('/', passport.authenticate('jwt', { session: false }), getAllSaves);

savesRouter.get('/:id', passport.authenticate('jwt', { session: false }), getSaveById);

savesRouter.post('/', passport.authenticate('jwt', { session: false }), createSave);

savesRouter.put('/:id', passport.authenticate('jwt', { session: false }), updateSave);

savesRouter.delete('/:id', passport.authenticate('jwt', { session: false }), deleteSave);
