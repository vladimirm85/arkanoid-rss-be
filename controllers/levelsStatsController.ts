import { Request, Response } from 'express';
import { LevelStatModel, LevelStatInterface, UserModel } from '../models/';
import { errorHandler, successHandler, TokenUserData } from '../utils';

export const getAllLevelsStats = async (req: Request, res: Response): Promise<Response> => {
  const { level, limit } = req.query;

  try {
    const levelsStats = await LevelStatModel.find({ level: +level })
      .sort({ score: -1 })
      .limit(+limit);

    return successHandler(res, 200, levelsStats);
  } catch (e: unknown) {
    if (!(e instanceof Error)) throw e;

    return errorHandler(res, 500, e.message);
  }
};

export const createLevelStat = async (req: Request, res: Response): Promise<Response> => {
  const { level, score } = req.body;

  const user = req.user as TokenUserData;

  try {
    const userCandidate = await UserModel.findById(user._id);
    if (userCandidate) {
      return errorHandler(res, 404, `No such user`);
    }

    const levelStat: LevelStatInterface = {
      level,
      score,
      nickname: userCandidate.nickname,
      createdAt: new Date(),
    };

    const levelStatDoc = await LevelStatModel.create(levelStat);

    await levelStatDoc.save();

    successHandler(res, 201, levelStatDoc);
  } catch (e: unknown) {
    if (!(e instanceof Error)) throw e;

    return errorHandler(res, 500, e.message);
  }
};
