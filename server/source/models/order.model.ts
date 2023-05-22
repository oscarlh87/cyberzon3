import mongoose, { Schema, model } from 'mongoose';

import { IOrder, IBuyerData } from '../interfaces/models.interface';

const orderSchema = new Schema<IOrder>({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      product: { type: Schema.Types.ObjectId, name: String, ref: 'Product' },
      quantity: { type: Number, required: true },
    },
  ],
  status: { type: String, default: 'pending' },
  token: { type: String },
  subtotal: { type: Number, required: true },
  total: { type: Number, required: true },
  installments: { type: Number },
  paymentMethodId: { type: String },
  buyerData: new Schema<IBuyerData>({
    name: { type: String },
    lastname: { type: String },
    phone: { type: String },
    company: { type: String },
    email: { type: String },
    country: { type: String },
    state: { type: String },
    city: { type: String },
    street: { type: String },
    cp: { type: String },
  }),
});

export default model<IOrder>('Order', orderSchema);
