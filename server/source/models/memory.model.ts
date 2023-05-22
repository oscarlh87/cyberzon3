import { Schema, model } from 'mongoose';

import { IMemory } from '../interfaces/models.interface';

const memorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  state: { type: Boolean, ref: 'Status', required: true,default: true },
});

export default model<IMemory>('Memory', memorySchema);
