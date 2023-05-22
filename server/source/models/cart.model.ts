import mongoose, { Schema, model } from 'mongoose';

import { ICart } from '../interfaces/models.interface';

const cartSchema = new Schema<ICart>({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      product: { type: Schema.Types.ObjectId, name: String, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
      //_id: false,
    },
  ],
  subTotal: { type: Number },
  total: { type: Number },
});

export default model<ICart>('Cart', cartSchema);
