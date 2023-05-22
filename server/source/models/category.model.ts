import { Schema, model } from 'mongoose';

import { ICategory } from '../interfaces/models.interface';

const categorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  state: { type: Boolean, ref: 'Status', required: true,default: true },
});

export default model<ICategory>('Category', categorySchema);
