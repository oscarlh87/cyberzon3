import { Schema, model } from 'mongoose';

import { ITax } from '../interfaces/models.interface';

const taxSchema = new Schema({
  name: { type: String, required: true, unique: true },
  state: { type: Boolean, ref: 'Status', required: true, default: true},
});

export default model<ITax>('Tax', taxSchema);
