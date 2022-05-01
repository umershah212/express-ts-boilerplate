import { Schema, model } from 'mongoose';

import { IHello } from './Hello.types';

const helloSchema = new Schema({
  images: [{ type: String }],
  name: { type: String, default: '', required: true },
  message: { type: String, default: '', required: true },
  createdAt: { type: Date, default: new Date() },
});

const Hello = model<IHello>('hello', helloSchema);

export default Hello;
