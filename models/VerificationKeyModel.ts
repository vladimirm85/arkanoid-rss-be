import { Schema, Document, model, Model } from 'mongoose';

export interface VerKeyInterface {
  userId: string;
  hash: string;
}

interface VerKeyDocumentInterface extends VerKeyInterface, Document {}

const VerificationKeySchema: Schema<VerKeyDocumentInterface> = new Schema({
  userId: {
    type: String,
    required: true,
  },
  hash: {
    type: String,
    required: true,
  },
  verifiedAt: {
    type: Date,
    default: null,
  },
});

export const VerKeyModel = model<VerKeyDocumentInterface, Model<VerKeyDocumentInterface>>(
  'verificationKey',
  VerificationKeySchema
);
