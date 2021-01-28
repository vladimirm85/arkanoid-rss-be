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
 *         description: unique id
 *         example: '60048e26a8486d510406b33f'
 *       saveData:
 *         type: object
 *         description: Data of the saved game
 *         example: '{saveData: 'saveData'}'
 *       userId:
 *         type: string
 *         description: User ID
 *         example: '600485e573f5ce001796f558'
 *       createdAt:
 *         type: string
 *         format: date # or date-time
 *         description: When save is created
 *         example: '2021-01-17T19:21:10.492+00:00'
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
