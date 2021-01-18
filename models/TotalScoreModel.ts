import { Schema, Document, model, Model } from 'mongoose';

export interface TotalScoreInterface {
  totalScore: number;
  userId: string;
  nickname: string;
  createdAt: Date;
}

export interface TotalScoreDocumentInterface extends TotalScoreInterface, Document {}

const TotalScoreSchema: Schema<TotalScoreDocumentInterface> = new Schema({
  totalScore: {
    type: Number,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const TotalScoreModel = model<
  TotalScoreDocumentInterface,
  Model<TotalScoreDocumentInterface>
>('totalScore', TotalScoreSchema);
