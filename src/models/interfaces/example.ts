import { Document } from 'mongoose';
export interface IExampleDocument extends Document {
  name: string;
  description: string;
  createdAt?: Date;
}
