import { Request, Response } from 'express';
import { SaveModel, SaveInterface } from '../models/SaveModel';
import { errorHandler, successHandler, TokenUserData } from '../utils';

export const getAllSaves = async (req: Request, res: Response): Promise<Response> => {
  try {
    const saves = await SaveModel.find({});

    return successHandler(res, 200, saves);
  } catch (e: unknown) {
    if (!(e instanceof Error)) throw e;

    return errorHandler(res, 404, e.message);
  }
};

export const getSaveById = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  try {
    const save = await SaveModel.findById(id);
    successHandler(res, 200, save);
  } catch (e: unknown) {
    if (!(e instanceof Error)) throw e;

    return errorHandler(res, 404, e.message);
  }
};

export const createSave = async (req: Request, res: Response): Promise<Response> => {
  const { saveJSON } = req.body;

  const user = req.user as TokenUserData;

  console.log(user._id);

  const saveData: SaveInterface = {
    saveJSON,
    userId: user._id,
    createdAt: new Date(),
  };

  const save = await SaveModel.create(saveData);

  try {
    await save.save();

    successHandler(res, 201, save);
  } catch (e: unknown) {
    if (!(e instanceof Error)) throw e;

    return errorHandler(res, 500, e.message);
  }
};

export const updateSave = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const { saveJSON } = req.body;

  try {
    const save = await SaveModel.findByIdAndUpdate(
      id,
      { saveJSON },
      { new: true, useFindAndModify: false }
    );

    successHandler(res, 201, save);
  } catch (e: unknown) {
    if (!(e instanceof Error)) throw e;

    return errorHandler(res, 500, e.message);
  }
};

export const deleteSave = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  try {
    await SaveModel.findByIdAndRemove(id, { useFindAndModify: false });

    successHandler(res, 200, 'Deleted');
  } catch (e: unknown) {
    if (!(e instanceof Error)) throw e;

    return errorHandler(res, 404, e.message);
  }
};

// const collectionName = 'saves';
//
// export const getAllSaves = async (req, res) => {
//   const list = await storage.listAll(collectionName);
//
//   res.json(list);
// };
//
// export const getSaveById = async (req, res) => {
//   const item = await storage.getById(collectionName, req.params['id']);
//
//   // prettier-ignore
//   res
//     .status(item ? 200 : 404)
//     .json(item ?? {
//       statusCode: 404,
//     });
// };
//
// export const createSave = async (req, res) => {
//   const id = uuid();
//
//   const { body } = req;
//
//   body.id = id;
//
//   const newBody = await storage.create(collectionName, body);
//
//   res.json(newBody);
// };
//
// export const updateSave = async (req, res) => {
//   const { body } = req;
//
//   const newBody = await storage.update(collectionName, {
//     ...body,
//     id: req.params['id'],
//   });
//
//   res.json(newBody);
// };
//
// export const deleteSave = async (req, res) => {
//   await storage.remove(collectionName, req.params['id']);
//
//   // prettier-ignore
//   res
//     .status(204)
//     .json(null);
// };
