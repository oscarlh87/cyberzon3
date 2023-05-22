import { Schema, model } from 'mongoose';

import { IStorage } from '../interfaces/models.interface';

const storageSchema = new Schema({
  name: { type: String, required: true, unique: true },
  state: { type: Boolean, ref: 'Status', required: true,default: true },
});

export default model<IStorage>('Storage', storageSchema);
