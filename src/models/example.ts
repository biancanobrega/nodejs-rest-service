import { Document, Schema } from 'mongoose';

export interface IExampleDocument extends Document {
  description: string;
  createdAt?: Date;
}

export const ExampleSchema = new Schema ({
  description: {
    type: String,
    required: [true, 'Define your required description message here']
  },
  createdAt: { type: Date, default: Date.now }
});

export interface IExampleRequest {
  description: string;
  createdAt?: Date;
}
