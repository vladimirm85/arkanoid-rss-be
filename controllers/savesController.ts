import { Request, Response } from 'express';
import { SaveModel, SaveInterface } from '../models/';
import { errorHandler, successHandler, TokenUserData } from '../utils';

export const getAllSaves = async (req: Request, res: Response): Promise<Response> => {
  const user = <TokenUserData>req.user;

  try {
    const saves = await SaveModel.find({ userId: user._id });

    return successHandler(res, 200, saves);
  } catch (e: unknown) {
    if (!(e instanceof Error)) throw e;

    return errorHandler(res, 500, e.message);
  }
};

export const getSaveById = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const user = <TokenUserData>req.user;

  try {
    const save = await SaveModel.find({ _id: id, userId: user._id });
    if (!save) {
      return errorHandler(res, 404, 'No such save');
    }

    successHandler(res, 200, save);
  } catch (e: unknown) {
    if (!(e instanceof Error)) throw e;

    return errorHandler(res, 500, e.message);
  }
};

export const createSave = async (req: Request, res: Response): Promise<Response> => {
  const { saveData } = req.body;

  const user = <TokenUserData>req.user;

  const save: SaveInterface = {
    saveData,
    userId: user._id,
    createdAt: new Date(),
  };

  try {
    const saveDoc = await SaveModel.create(save);

    await saveDoc.save();

    successHandler(res, 201, saveDoc);
  } catch (e: unknown) {
    if (!(e instanceof Error)) throw e;

    return errorHandler(res, 500, e.message);
  }
};

export const updateSave = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const { saveData } = req.body;
  const user = <TokenUserData>req.user;

  try {
    const save = await SaveModel.findOneAndUpdate(
      { _id: id, userId: user._id },
      { saveData },
      { new: true, useFindAndModify: false }
    );
    if (!save) {
      return errorHandler(res, 404, 'No such save');
    }

    successHandler(res, 200, save);
  } catch (e: unknown) {
    if (!(e instanceof Error)) throw e;

    return errorHandler(res, 500, e.message);
  }
};

export const deleteSave = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const user = <TokenUserData>req.user;

  try {
    const save = await SaveModel.findOneAndDelete(
      { _id: id, userId: user._id },
      { useFindAndModify: false }
    );
    if (!save) {
      return errorHandler(res, 404, 'No such save');
    }

    successHandler(res, 200, 'Deleted');
  } catch (e: unknown) {
    if (!(e instanceof Error)) throw e;

    return errorHandler(res, 500, e.message);
  }
};
