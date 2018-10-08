import { Document, Schema } from 'mongoose';

export interface IDoc extends Document {
  name: string;
  description: string;
  createdAt?: Date;
}

export const schema = new Schema({
  name: { type: String, required: [true, 'Name is required.'] },
  description: { type: String, required: [true, 'Description is required.'] },
  createdAt: {
    type: String,
    createdAt: { type: Date, default: Date.now }
  }
});
