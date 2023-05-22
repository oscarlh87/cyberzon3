import { Schema, model } from 'mongoose';

import { IKeyboard } from '../interfaces/models.interface';

const keyboardSchema = new Schema({
  name: { type: String, required: true, unique: true },
  state: { type: Boolean, ref: 'Status', required: true,default: true },
});
export default model<IKeyboard>('Keyboard', keyboardSchema);
