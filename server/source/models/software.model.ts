import { Schema, model } from 'mongoose';

import { ISoftware } from '../interfaces/models.interface';

const softwareSchema = new Schema({
  name: { type: String, required: true, default: 'Windows 10', unique: true },
  state: { type: Boolean, ref: 'Status', required: true,default: true },
});

export default model<ISoftware>('Software', softwareSchema);
