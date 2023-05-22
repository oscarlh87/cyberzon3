import { Schema, model } from 'mongoose';

import { ISlider } from '../interfaces/models.interface';

const sliderSchema = new Schema({
  id: { type: Number, },
  name: { type: String, required: true, },
  image: { type: String, maxlength: 500, required: true },
  state: { type: Boolean, ref: 'Status', required: true,default: true },
});

export default model<ISlider>('Slider', sliderSchema);
