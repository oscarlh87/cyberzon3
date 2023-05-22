import { Schema, model } from 'mongoose';

import { IBrand } from '../interfaces/models.interface';

const brandSchema = new Schema({
  name: { type: String, required: true, unique: true },
  link: { type: String, required: false },
  image: { type: String, maxlength: 500, required: true },
  state: { type: Boolean, ref: 'State', default: true },
});

export default model<IBrand>('Brand', brandSchema);
