import { Schema, Document, model, Model } from 'mongoose';

export interface RecoveryPasswordKeyInterface {
  userId: string;
  hash: string;
  createdAt?: Date;
}

interface RecoveryPasswordKeyDocumentInterface extends RecoveryPasswordKeyInterface, Document {}

const RecoveryPasswordKeySchema: Schema<RecoveryPasswordKeyDocumentInterface> = new Schema({
  userId: {
    type: String,
    required: true,
  },
  hash: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: null,
  },
});

export const RecoveryPasswordKeyModel = model<
  RecoveryPasswordKeyDocumentInterface,
  Model<RecoveryPasswordKeyDocumentInterface>
>('recoveryPasswordKey', RecoveryPasswordKeySchema);
