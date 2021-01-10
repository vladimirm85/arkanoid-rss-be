import { v4 as uuid } from 'uuid';
import { Router } from 'express';
import * as storage from '../storage/mongo';

const collectionName = 'auth';

export const authRouter = Router();

authRouter.post('/login', async (req, res) => {
  const id = uuid();

  const { body } = req;

  body.id = id;

  const newBody = await storage.create(collectionName, body);

  res.json(newBody);
});

authRouter.post('/login', async (req, res) => {
  const id = uuid();

  const { body } = req;

  body.id = id;

  const newBody = await storage.create(collectionName, body);

  res.json(newBody);
});
