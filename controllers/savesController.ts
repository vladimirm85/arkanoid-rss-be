import { v4 as uuid } from 'uuid';
import * as storage from '../storage/mongo';

const collectionName = 'saves';

export const getAllSaves = async (req, res) => {
  const list = await storage.listAll(collectionName);

  res.json(list);
};

export const getSaveById = async (req, res) => {
  const item = await storage.getById(collectionName, req.params['id']);

  // prettier-ignore
  res
    .status(item ? 200 : 404)
    .json(item ?? {
      statusCode: 404,
    });
};

export const createSave = async (req, res) => {
  const id = uuid();

  const { body } = req;

  body.id = id;

  const newBody = await storage.create(collectionName, body);

  res.json(newBody);
};

export const updateSave = async (req, res) => {
  const { body } = req;

  const newBody = await storage.update(collectionName, {
    ...body,
    id: req.params['id'],
  });

  res.json(newBody);
};

export const deleteSave = async (req, res) => {
  await storage.remove(collectionName, req.params['id']);

  // prettier-ignore
  res
    .status(204)
    .json(null);
};
