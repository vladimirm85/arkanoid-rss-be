import { Schema, Document, model, Model } from 'mongoose';

export interface LevelStatInterface {
  level: number;
  score: number;
  nickname: string;
  createdAt: Date;
}

export interface LevelStatDocumentInterface extends LevelStatInterface, Document {}

const LevelStatSchema: Schema<LevelStatDocumentInterface> = new Schema({
  level: {
    type: Number,
    required: true,
  },
  score: {
    type: Number,
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

export const LevelStatModel = model<LevelStatDocumentInterface, Model<LevelStatDocumentInterface>>(
  'levelStat',
  LevelStatSchema
);
