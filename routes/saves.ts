import { v4 as uuid } from 'uuid';
import { Router } from 'express';
import * as storage from '../storage/mongo';

export const savesRouter = Router();

savesRouter.get('/', async (req, res) => {
  const list = await storage.listAll();

  res.json(list);
});

savesRouter.get('/:id', async (req, res) => {
  const item = await storage.getById(req.params['id']);

  // prettier-ignore
  res
    .status(item ? 200 : 404)
    .json(item ?? {
      statusCode: 404,
    });
});

savesRouter.post('/', async (req, res) => {
  const id = uuid();

  const { body } = req;

  body.id = id;

  const newBody = await storage.create(body);

  res.json(newBody);
});

savesRouter.put('/:id', async (req, res) => {
  const { body } = req;

  const newBody = await storage.update({
    ...body,
    id: req.params['id'],
  });

  res.json(newBody);
});

savesRouter.delete('/:id', async (req, res) => {
  await storage.remove(req.params['id']);

  // prettier-ignore
  res
    .status(204)
    .json(null);
});
