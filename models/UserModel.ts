import { Schema, Document, model, Model } from 'mongoose';
import { generateHash } from '../utils';

export interface UserInterface {
  email: string;
  password: string;
  totalScore: number;
  avatar?: object;
  createdAt: Date;
}

export interface UserDocumentInterface extends UserInterface, Document {}

const UserSchema: Schema<UserDocumentInterface> = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  totalScore: {
    type: Number,
    required: true,
  },
  avatar: {
    type: Object,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

UserSchema.pre<UserDocumentInterface>('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await generateHash(this.password);
  }
  next();
});

export const UserModel = model<UserDocumentInterface, Model<UserDocumentInterface>>(
  'user',
  UserSchema
);
