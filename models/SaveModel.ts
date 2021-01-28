import { Schema, Document, model, Model } from 'mongoose';

export interface SaveInterface {
  saveData: object;
  userId: string;
  createdAt: Date;
}

export interface SaveDocumentInterface extends SaveInterface, Document {}

const SaveSchema: Schema<SaveDocumentInterface> = new Schema({
  saveData: {
    type: Object,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const SaveModel = model<SaveDocumentInterface, Model<SaveDocumentInterface>>(
  'save',
  SaveSchema
);
