import { Schema, model } from 'mongoose';

import { IRole } from '../interfaces/models.interface';

const roleSchema = new Schema({
  name: { type: String, required: true, unique: true, default: 'user' },
  access: { type: [String], require: false, default: ['user'] },
  state: { type: Boolean, ref: 'Status', required: true, default: true },
});

export default model<IRole>('Role', roleSchema);
