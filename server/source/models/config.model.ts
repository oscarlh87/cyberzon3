import { Schema, model } from 'mongoose';

import { IConfig } from '../interfaces/models.interface';

const configSchema = new Schema({
  //name: {type: String, required: false},
  showSlider: { type: Boolean, required: true,},
});

export default model<IConfig>('Config', configSchema);
