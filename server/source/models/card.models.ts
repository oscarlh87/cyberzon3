import mongoose from 'mongoose';
import { Schema, model } from 'mongoose';

import { ICard } from '../interfaces/models.interface';

const cardSchema = new Schema({
  name: { type: String, required: true },
  client: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
  cant: { type: Number},
  p_unit: { type: Number},
  p_subtotal: { type: Number},
  p_total: { type: Number},
  tax: { type: Number},
  state: { type: Boolean, ref: 'Status', required: true, default: true},
});

export default model<ICard>('ICard', cardSchema);