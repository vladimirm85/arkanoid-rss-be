import { Request, Response } from 'express';
import { LevelStatModel, LevelStatInterface, UserModel } from '../models/';
import { errorHandler, successHandler, TokenUserData } from '../utils';

interface FilterOptions {
  level: number;
  userId?: string;
}

export const getAllLevelsStats = async (req: Request, res: Response): Promise<Response> => {
  const { level, limit, forUser } = req.query;
  const user = req.user as TokenUserData;

  const filterOptions: FilterOptions = {
    level: +level,
  };

  if (+forUser) {
    filterOptions.userId = user._id;
  }

  try {
    const levelsStats = await LevelStatModel.find(filterOptions)
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
    if (!userCandidate) {
      return errorHandler(res, 404, `No such user`);
    }

    const levelStat: LevelStatInterface = {
      level,
      score,
      userId: user._id,
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
