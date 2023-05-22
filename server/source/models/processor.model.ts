import { Schema, model } from 'mongoose';

import { IProcessor } from '../interfaces/models.interface';

const processorSchema = new Schema({
  name: { type: String, required: true, unique: true },
  state: { type: Boolean, ref: 'Status', required: true,default: true },
});

export default model<IProcessor>('Processor', processorSchema);
