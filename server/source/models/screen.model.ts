import { Schema, model } from 'mongoose';

import { IScreen } from '../interfaces/models.interface';

const screenSchema = new Schema({
  name: { type: String, required: true, unique: true },
  state: { type: Boolean, ref: 'Status', required: true,default: true },
});

export default model<IScreen>('Screen', screenSchema);
