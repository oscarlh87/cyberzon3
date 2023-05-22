import { Schema, model } from 'mongoose';

import { INewletter } from '../interfaces/models.interface';

const newletterSchema = new Schema({
  email: { type: String, required: true, unique: true },
  state: { type: Boolean, ref: 'Status',default: true },
});

export default model<INewletter>('NewletterSchema', newletterSchema);
