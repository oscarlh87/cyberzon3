import { Schema, model } from 'mongoose';

import { IGraphic } from '../interfaces/models.interface';

const graphicSchema = new Schema({
  name: { type: String, required: true, unique: true },
  state: { type: Boolean, ref: 'Status', required: true, default: true},
});

export default model<IGraphic>('Graphic', graphicSchema);
