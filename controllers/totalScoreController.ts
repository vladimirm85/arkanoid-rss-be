import { Request, Response } from 'express';
import { TotalScoreModel, TotalScoreInterface, UserModel } from '../models/';
import { errorHandler, successHandler, TokenUserData } from '../utils';

export const getAllTotalScores = async (req: Request, res: Response): Promise<Response> => {
  const { limit } = req.query;

  try {
    const totalScores = await TotalScoreModel.find()
      .sort({ totalScore: -1 })
      .limit(+limit);

    return successHandler(res, 200, totalScores);
  } catch (e: unknown) {
    if (!(e instanceof Error)) throw e;

    return errorHandler(res, 404, e.message);
  }
};

export const createTotalScore = async (req: Request, res: Response): Promise<Response> => {
  const { totalScore } = req.body;

  const user = req.user as TokenUserData;

  const userCandidate = await UserModel.findById(user._id);
  if (!userCandidate) {
    return errorHandler(res, 404, `user not found`);
  }

  if (userCandidate.totalScore < totalScore) {
    try {
      await userCandidate.updateOne({ totalScore });

      const totalScoreCandidate = await TotalScoreModel.findOne({ userId: user._id });

      if (!totalScoreCandidate) {
        const totalScoreItem: TotalScoreInterface = {
          totalScore,
          userId: user._id,
          nickname: user.email.split('@')[0],
          createdAt: new Date(),
        };

        const totalScoreDoc = await TotalScoreModel.create(totalScoreItem);

        await totalScoreDoc.save();

        return successHandler(res, 201, totalScoreDoc);
      }

      await totalScoreCandidate.updateOne({ totalScore });

      const updatedTotalScore = await TotalScoreModel.findOne({ userId: user._id });

      return successHandler(res, 201, updatedTotalScore);
    } catch (e: unknown) {
      if (!(e instanceof Error)) throw e;

      return errorHandler(res, 500, e.message);
    }
  }

  return successHandler(res, 200, '');
};
