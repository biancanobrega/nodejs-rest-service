import { Schema } from 'mongoose';

export const ExampleSchema = new Schema({
  name: { type: String, required: [true, 'Name is required.'] },
  description: { type: String, required: [true, 'Description is required.'] },
  createdAt: {
    type: String,
    createdAt: { type: Date, default: Date.now }
  }
});
