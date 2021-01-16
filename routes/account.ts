import { Router } from 'express';
import { verify } from '../controllers';

export const accountRouter = Router();

accountRouter.get('/verify', verify);
