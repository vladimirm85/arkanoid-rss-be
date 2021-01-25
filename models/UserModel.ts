import { Schema, Document, model, Model } from 'mongoose';
import { generateHash } from '../utils';

export interface UserInterface {
  email: string;
  nickname: string;
  password?: string;
  totalScore: number;
  avatar?: string;
  createdAt: Date;
}

export interface UserDocumentInterface extends UserInterface, Document {}

const UserSchema: Schema<UserDocumentInterface> = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  nickname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    default: '',
  },
  totalScore: {
    type: Number,
    required: true,
  },
  avatar: {
    type: String,
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
