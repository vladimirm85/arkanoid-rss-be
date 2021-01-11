import { Schema, Document, model, Model } from 'mongoose';

export interface User {
  email: string;
  password: string;
  createdAt: Date;
}

interface UserDocument extends User, Document {}
interface UserModel extends User, Model<UserDocument> {}

const UserSchema: Schema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const UserModel = model<UserDocument, UserModel>('user', UserSchema);
